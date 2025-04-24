import { env } from '@/lib/env';
import { googleAuth } from '@/services';
import { generateState, generateCodeVerifier } from 'arctic';
import { cookies } from 'next/headers';

export const GET = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = googleAuth.createAuthorizationURL(state, codeVerifier, ['profile', 'email']);

  const allCookies = await cookies();

  allCookies.set('google_oauth_state', state, {
    secure: env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10,
  });

  allCookies.set('google_code_verifier', codeVerifier, {
    secure: env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return Response.redirect(url);
};
