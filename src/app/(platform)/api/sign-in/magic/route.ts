import { setSession, signInWithMagicLinkService } from '@/services';
import { URL_AFTER_LOGIN, URL_MAGIC_ERROR, URL_SIGN_IN } from '@/shared/constants';
import { rateLimitByIp } from '@/utils/limiter.util';

export const GET = async (req: Request) => {
  try {
    await rateLimitByIp({ key: 'magic-link', limit: 10, window: 60000 });
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: URL_SIGN_IN,
        },
      });
    }

    const user = await signInWithMagicLinkService(token);

    await setSession(user.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_AFTER_LOGIN,
      },
    });
  } catch (error) {
    console.log(error); // Add logger
    return new Response(null, {
      status: 302,
      headers: {
        Location: URL_MAGIC_ERROR,
      },
    });
  }
};
