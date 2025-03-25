import { TUser, TSession, TSessionInsert } from '@/db/export-schema';
import {
  APP_UI_NAME,
  SESSION_AUTH_COOKIE_NAME,
  SESSION_DURATION,
  SESSION_RANDOM_LENGTH,
  SESSION_REFRESH_INTERVAL,
} from '@/shared/constants';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import {
  createSessionDao,
  createUserDao,
  deleteSessionById,
  deleteSessionByUserId,
  getSessionWithUserById,
  getUserByEmailDao,
  updateSessionById,
  updateUserByIdDao,
} from '@/dao';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';
import { AuthError, LoginError, PublicError } from '@/shared/app-errors';
import { TSignInEmailSchema, TSignUpSchema } from '@/components/forms/auth/_schemas';
import { getVerifyEmailTokenDao, upsertVerifyEmailToken } from '@/dao/verify-email.dao';
import { sendEmail } from '@/lib/resend';
import { VerifyEmail } from '@/emails';
import { compareStrings, hashString } from '@/utils/crypting.util';
import { createServiceLogger } from '@/lib/logger/logger';
import { timeUTC } from '@/utils';

const logger = createServiceLogger('auth-service');

export const generateSessionToken = () => {
  logger.debug('Generating new session token');

  const bytes = new Uint8Array(SESSION_RANDOM_LENGTH);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
};

export const getSessionToken = async () => {
  logger.debug('Get session token');

  const allCookies = await cookies();

  const sessionCookie = allCookies.get(SESSION_AUTH_COOKIE_NAME)?.value;

  return sessionCookie;
};

export const createSession = async (token: string, userId: string) => {
  logger.debug({ userId }, 'Creating new session');
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: TSessionInsert = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_DURATION),
  };
  await createSessionDao(session);
  logger.info({ userId, expiresId: session.expiresAt }, 'Session created');

  return session;
};

export const validateSessionToken = async (token: string) => {
  logger.debug('Validating session token');
  const sessionErrorResult = { session: null, user: null };
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sessionWithUser = await getSessionWithUserById(sessionId);

  if (sessionWithUser.length < 1) {
    logger.info('Session not found');
    return sessionErrorResult;
  }

  const { session, user } = sessionWithUser[0];
  logger.debug({ userId: user.id, sessionId: session.id }, 'Session found');

  if (Date.now() >= session.expiresAt.getTime()) {
    logger.info({ userId: user.id }, 'Session expired, deleting');
    await deleteSessionById(session.id);
    return sessionErrorResult;
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL) {
    logger.info({ userId: user.id }, 'Refreshing session expiry');
    session.expiresAt = new Date(Date.now() + SESSION_DURATION);
    await updateSessionById(session.id, { expiresAt: session.expiresAt });
  }

  logger.info({ userId: user.id, expiresId: session.expiresAt }, 'Session validated');

  return { user, session };
};

export const deleteSession = async (sessionId: string) => {
  logger.info('Deleting session');
  await deleteSessionById(sessionId);
};

export const deleteUserSession = async (userId: string) => {
  logger.info({ userId }, 'Deleting all sessions for user');
  await deleteSessionByUserId(userId);
};

export const validateRequest = async () => {
  logger.debug('Validating request');
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    logger.info('Session token not found');
    return { user: null, session: null };
  }

  logger.info('Request validated successfully');
  return validateSessionToken(sessionToken);
};

export const setSessionTokenCookie = async (token: string, expiresAt: Date) => {
  const allCookies = await cookies();
  allCookies.set(SESSION_AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  });
};

export const deleteSessionTokenCookie = async () => {
  const allCookies = await cookies();
  allCookies.set(SESSION_AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
};

export const setSession = async (userId: string) => {
  logger.debug('Setting session');
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
  logger.info('Setting session successfully');
};

export const getCurrentUser = async () => {
  logger.debug('Fetching current user from session');

  const { user } = await validateRequest();

  if (user) {
    logger.debug({ userId: user.id }, 'Current user found');
  } else {
    logger.debug('No authenticated user found');
  }

  return user ?? undefined;
};

export const checkIfAuthenticated = async () => {
  logger.debug('Checking authentication status');

  const user = await getCurrentUser();
  if (!user) {
    logger.info('Authentication check failed - no user found');

    throw new AuthError();
  }

  logger.debug({ userId: user.id }, 'Authentication check passed');
  return user;
};

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
    logger.error({ error }, 'Verify email was not send');
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

export type TSessionValidateResult =
  | { session: TSession; user: TUser }
  | { session: null; user: null };
