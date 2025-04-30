// import 'server-only';
import { API_GOOGLE_CALLBACK, APP_UI_NAME } from '@/shared/constants';
import { createUserDao, deleteSessionByUserId, getUserByEmailDao, updateUserByIdDao } from '@/dao';
import { env } from '@/lib/env';
import { AuthError, LoginError, PublicError } from '@/shared/app-errors';
import { getVerifyEmailTokenDao, upsertVerifyEmailToken } from '@/dao/verify-email.dao';
import { sendEmail } from '@/lib/resend';
import { VerifyEmail } from '@/emails';
import { compareStrings, hashString } from '@/utils/crypting.util';
import { createServiceLogger } from '@/lib/logger/logger';
import { errorHandler, timeUTC } from '@/utils';
import { cache } from 'react';
import { getSessionToken, validateSessionToken } from '@/lib/sessions';
import { Google } from 'arctic';
import { TSignInEmailSchema, TSignUpSchema } from '@/lib/zod';

const logger = createServiceLogger('auth.service');

export const deleteUserSession = async (userId: string) => {
  logger.info({ userId }, 'Deleting all sessions for user');
  await deleteSessionByUserId(userId);
};

export const validateRequest = async () => {
  logger.debug('Validating request');
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    logger.warn('Session token not found');
    return { user: null, session: null };
  }

  logger.info('Request validated successfully');
  return validateSessionToken(sessionToken);
};

export const getCurrentUser = cache(async () => {
  logger.debug('Fetching current user from session');
  const { user } = await validateRequest();

  if (user) {
    logger.debug({ userId: user.id }, 'Current user found');
  } else {
    logger.warn('No authenticated user found');
    throw new AuthError();
  }

  return user;
});

export const registerUserService = async (data: TSignUpSchema) => {
  logger.debug({ email: data.email }, 'Attempting to register new user');
  const userExists = await getUserByEmailDao(data.email);

  if (userExists) {
    logger.info({ email: data.email }, 'Registration failed - email already exists');
    throw new PublicError('User with this email already exists');
  }

  const hashedPassword = await hashString(data.password);

  logger.debug({ email: data.email }, 'Creating new user account');
  const user = await createUserDao({
    userData: {
      email: data.email,
    },
    accountData: {
      password: hashedPassword,
      accountType: 'email',
    },
    profileData: {
      fullName: data.fullName,
    },
  });

  const token = await upsertVerifyEmailToken(user.id);
  logger.info(
    { userId: user.id, email: data.email },
    'User registered successfully, sending verification email'
  );

  try {
    await sendEmail(
      data.email,
      `Verify your email for ${APP_UI_NAME}`,
      <VerifyEmail link={`${env.HOST_NAME}/api/sign-up/verify-email?token=${token}`} />
    );
    logger.info({ email: data.email }, 'Sent verify email successfully');
  } catch (error) {
    logger.error(
      { error: errorHandler(error), stack: error instanceof Error ? error.stack : undefined },
      'Verify email was not send'
    );
    throw error;
  }

  return { id: user.id };
};

export const verifyEmailTokenService = async (token: string) => {
  logger.debug('Verifying email token');
  const tokenExists = await getVerifyEmailTokenDao(token);

  if (!tokenExists) {
    logger.warn({ token }, 'Email verification failed - token not found');
    throw new PublicError('Token does not exists');
  }

  const userId = tokenExists.userId;
  logger.info({ userId }, 'Email verified successfully');
  await updateUserByIdDao(userId, { userData: { emailVerified: timeUTC() } });

  return userId;
};

export const signInUserWithEmailService = async (input: TSignInEmailSchema) => {
  logger.debug({ email: input.email }, 'User login attempt');

  const user = await getUserByEmailDao(input.email, { includeAccount: true });

  if (!user) {
    logger.info({ email: input.email }, 'Login failed - user not found');
    throw new LoginError();
  }

  const emailAccount = user.userAccounts?.find(item => item.accountType === 'email');

  if (!emailAccount) {
    logger.info({ userId: user.id, email: input.email }, 'Login failed - no email account found');
    throw new LoginError();
  }

  const passwordMatch = await compareStrings(emailAccount.password, input.password);

  if (!passwordMatch) {
    logger.info({ userId: user.id, email: input.email }, 'Login failed - incorrect password');
    throw new LoginError();
  }

  logger.info({ userId: user.id, email: input.email }, 'User logged in successfully');

  return {
    id: user.id,
  };
};

export const googleAuth = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  API_GOOGLE_CALLBACK(env.HOST_NAME)
);
