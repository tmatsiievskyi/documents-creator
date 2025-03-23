import { setSession, verifyEmailTokenService } from '@/services';
import { URL_AFTER_LOGIN, URL_SIGN_UP } from '@/shared/constants';
import { rateLimitByIp } from '@/utils/limiter.util';

export const GET = async (req: Request) => {
  try {
    await rateLimitByIp({ key: 'verify-email', limit: 10, window: 60000 });

    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: URL_SIGN_UP,
        },
      });
    }

    const userId = await verifyEmailTokenService(token);

    await setSession(userId);

    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_AFTER_LOGIN,
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_SIGN_UP,
      },
    });
  }
};
