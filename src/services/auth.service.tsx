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
import { compareStrings, hashString } from '@/utils';

export const generateSessionToken = () => {
  const bytes = new Uint8Array(SESSION_RANDOM_LENGTH);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
};

export const getSessionToken = async () => {
  const allCookies = await cookies();

  const sessionCookie = allCookies.get(SESSION_AUTH_COOKIE_NAME)?.value;

  return sessionCookie;
};

export const createSession = async (token: string, userId: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: TSessionInsert = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_DURATION),
  };
  await createSessionDao(session);

  return session;
};

export const validateSessionToken = async (token: string) => {
  const sessionErrorResult = { session: null, user: null };
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sessionWithUser = await getSessionWithUserById(sessionId);

  if (sessionWithUser.length < 1) {
    return sessionErrorResult;
  }

  const { session, user } = sessionWithUser[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await deleteSessionById(session.id);
    return sessionErrorResult;
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL) {
    session.expiresAt = new Date(Date.now() + SESSION_DURATION);
    await updateSessionById(session.id, { expiresAt: session.expiresAt });
  }

  return { user, session };
};

export const deleteSession = async (sessionId: string) => {
  await deleteSessionById(sessionId);
};

export const deleteUserSession = async (userId: string) => {
  await deleteSessionByUserId(userId);
};

export const validateRequest = async () => {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return { user: null, session: null };
  }

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
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
};

export const getCurrentUser = async () => {
  const { user } = await validateRequest();

  return user ?? undefined;
};

export const checkIfAuthenticated = async () => {
  const user = getCurrentUser();
  if (!user) {
    throw new AuthError();
  }
  return user;
};

export const registerUserService = async (data: TSignUpSchema) => {
  const userExists = await getUserByEmailDao(data.email);

  if (userExists) {
    throw new PublicError('User with this email already exists');
  }

  const hashedPassword = await hashString(data.password);

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

  await sendEmail(
    data.email,
    `Verify your email for ${APP_UI_NAME}`,
    <VerifyEmail link={`${env.HOST_NAME}/api/sign-up/verify-email?token=${token}`} />
  );

  return { id: user.id };
};

export const verifyEmailTokenService = async (token: string) => {
  const tokenExists = await getVerifyEmailTokenDao(token);

  if (!tokenExists) {
    throw new PublicError('Token does not exists');
  }

  const userId = tokenExists.userId;
  await updateUserByIdDao(userId, { userData: { emailVerified: new Date() } });

  return userId;
};

export const signInUserWithEmailService = async (input: TSignInEmailSchema) => {
  const user = await getUserByEmailDao(input.email, { includeAccount: true });

  if (!user) {
    throw new LoginError();
  }

  const emailAccount = user.userAccounts?.find(item => item.accountType === 'email');

  if (!emailAccount) {
    throw new LoginError();
  }

  const passwordMatch = await compareStrings(emailAccount.password, input.password);

  if (!passwordMatch) {
    throw new LoginError();
  }

  return {
    id: user.id,
  };
};

export type TSessionValidateResult =
  | { session: TSession; user: TUser }
  | { session: null; user: null };
