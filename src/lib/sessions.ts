import 'server-only';
import {
  SESSION_AUTH_COOKIE_NAME,
  SESSION_DURATION,
  SESSION_RANDOM_LENGTH,
  SESSION_REFRESH_INTERVAL,
} from '@/shared/constants';
import { cookies } from 'next/headers';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import {
  createSessionDao,
  deleteSessionById,
  getSessionWithUserById,
  updateSessionById,
} from '@/dao';
import { TSession, TSessionInsert, TUser } from '@/db/export-schema';
import { env } from '@/lib/env';

export const generateSessionToken = () => {
  //   logger.debug('Generating new session token');

  const bytes = new Uint8Array(SESSION_RANDOM_LENGTH);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
};

export const setSession = async (userId: string) => {
  //   logger.debug('Setting session');
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
  //   logger.info('Setting session successfully');
};

export const getSessionToken = async () => {
  //   logger.debug('Get session token');

  const allCookies = await cookies();

  const sessionCookie = allCookies.get(SESSION_AUTH_COOKIE_NAME)?.value;

  return sessionCookie;
};

export const createSession = async (token: string, userId: string) => {
  //   logger.debug({ userId }, 'Creating new session');
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: TSessionInsert = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_DURATION),
  };
  await createSessionDao(session);
  //   logger.info({ userId, expiresId: session.expiresAt }, 'Session created');

  return session;
};

export const validateSessionToken = async (token: string) => {
  //   logger.debug('Validating session token');
  const sessionErrorResult = { session: null, user: null };
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sessionWithUser = await getSessionWithUserById(sessionId);

  if (sessionWithUser.length < 1) {
    // logger.warn('Session not found');
    return sessionErrorResult;
  }

  const { session, user } = sessionWithUser[0];
  //   logger.debug({ userId: user.id, sessionId: session.id }, 'Session found');

  if (Date.now() >= session.expiresAt.getTime()) {
    // logger.info({ userId: user.id }, 'Session expired, deleting');
    await deleteSessionById(session.id);
    return sessionErrorResult;
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL) {
    // logger.info({ userId: user.id }, 'Refreshing session expiry');
    session.expiresAt = new Date(Date.now() + SESSION_DURATION);
    await updateSessionById(session.id, { expiresAt: session.expiresAt });
  }

  //   logger.info({ userId: user.id, expiresId: session.expiresAt }, 'Session validated');

  return { user, session };
};

export const deleteSession = async (sessionId: string) => {
  // logger.info('Deleting session');
  await deleteSessionById(sessionId);
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
    secure: env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
};
export type TSessionValidateResult =
  | { session: TSession; user: TUser }
  | { session: null; user: null };
