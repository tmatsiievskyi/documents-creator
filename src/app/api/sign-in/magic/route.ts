import { createRequestLogger } from '@/lib/logger/logger';
import { setSession } from '@/lib/sessions';
import { signInWithMagicLinkService } from '@/services';
import { URL_AFTER_LOGIN, URL_MAGIC_ERROR, URL_SIGN_IN } from '@/shared/constants';
import { errorHandler } from '@/utils';
import { rateLimitByIp } from '@/utils/limiter.util';

const logger = createRequestLogger();

export const GET = async (req: Request) => {
  logger.debug('GET. Magic link verififcation request');

  try {
    await rateLimitByIp({ key: 'magic-link', limit: 10, window: 60000 });
    logger.debug('Rate limit check passed');

    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      logger.info('Missing token in magic link request, redirecting to sign in');
      return new Response(null, {
        status: 302,
        headers: {
          Location: URL_SIGN_IN,
        },
      });
    }

    logger.debug('Verifying magic link token');
    const user = await signInWithMagicLinkService(token);
    logger.info({ userId: user.id }, 'Magic link verified successfully');

    logger.debug({ userId: user.id }, 'Setting user session');
    await setSession(user.id);

    logger.info({ userId: user.id }, 'User authenticated via magic link, redirecting to dashboard');
    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_AFTER_LOGIN,
      },
    });
  } catch (error) {
    logger.error(
      {
        error: errorHandler(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      'Magic link verification failed'
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_MAGIC_ERROR,
      },
    });
  }
};
