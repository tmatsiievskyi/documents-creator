import { setSession } from '@/lib/sessions';
import { getAccountByGoogleIdService, googleAuth } from '@/services';
import { createUserByGoogle } from '@/services/user.service';
import { URL_DASHBOARD } from '@/shared/constants';
import { TGoogleUser } from '@/shared/types';
import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { createRequestLogger } from '@/lib/logger/logger';
import { errorHandler } from '@/utils';

const logger = createRequestLogger();

export const GET = async (req: Request) => {
  logger.info('GET. Google callback');

  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const allCookies = await cookies();
  const storedState = allCookies.get('google_oauth_state')?.value ?? null;
  const codeVerifier = allCookies.get('google_code_verifier')?.value ?? null;

  if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
    logger.warn(
      { code, state, storedState, codeVerifier },
      'GET. Google callback. Not passed check'
    );
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(code, codeVerifier);
    const resp = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    const googleUser: TGoogleUser = await resp.json();

    const existingAccount = await getAccountByGoogleIdService(googleUser.sub);

    if (existingAccount) {
      logger.info({ accountId: existingAccount.id }, 'GET. Google callback. Account exists');
      await setSession(existingAccount.userId);
      return new Response(null, {
        status: 302,
        headers: {
          Location: URL_DASHBOARD,
        },
      });
    }

    const fullUser = await createUserByGoogle(googleUser);
    logger.info({ accountId: fullUser.user.id }, 'GET. Google callback. Created new user');

    await setSession(fullUser.user.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_DASHBOARD,
      },
    });
  } catch (error) {
    logger.error(
      {
        error: errorHandler(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      'GET. Google callback failed'
    );

    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
};
