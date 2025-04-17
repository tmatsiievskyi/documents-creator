import { createRequestLogger } from '@/lib/logger/logger';
import { setSession } from '@/lib/sessions';
import { verifyEmailTokenService } from '@/services';
import { URL_AFTER_LOGIN, URL_SIGN_UP } from '@/shared/constants';
import { rateLimitByIp } from '@/utils/limiter.util';

const logger = createRequestLogger();

export const GET = async (req: Request) => {
  logger.debug('GET. Verify email request ');
  try {
    await rateLimitByIp({ key: 'verify-email', limit: 10, window: 60000 });
    logger.debug('Rate limit check passed');

    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      logger.info('Missing token in verify email link request, redirecting to sign in');
      return new Response(null, {
        status: 302,
        headers: {
          Location: URL_SIGN_UP,
        },
      });
    }

    const userId = await verifyEmailTokenService(token);

    if (userId) {
      logger.debug({ userId }, 'User found');
    } else {
      logger.debug('User not found');
    }

    await setSession(userId);
    logger.info({ userId }, 'User authenticated via verify email link, redirecting to dashboard');

    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_AFTER_LOGIN,
      },
    });
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      'Verify email failed'
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_SIGN_UP,
      },
    });
  }
};
