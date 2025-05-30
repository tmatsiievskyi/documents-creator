import { NextRequest, NextResponse } from 'next/server';
import { cookieMiddleware, reqMiddleware } from './middlewares';
import createMiddleware from 'next-intl/middleware';
import { localeRouting } from './lib/i18n';

const handleI18nRouting = createMiddleware(localeRouting);

function middleware(req: NextRequest) {
  const res = handleI18nRouting(req);
  const { pathname } = req.nextUrl;

  const section = pathname.split('/')[2];

  if (section && section.startsWith('auth')) {
    return authRouteMiddleware(req, res);
  }

  return res;
  // return defaultMiddleware(req, res);
}

function authRouteMiddleware(req: NextRequest, res: NextResponse) {
  res = reqMiddleware(req, res);
  res = cookieMiddleware(req, res);

  return res;
}

// function defaultMiddleware(req: NextRequest, res: NextResponse) {
//   let res = NextResponse.next();
//   res = reqMiddleware(req, res);

//   return res;
// }

export default middleware;
// '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};

// export const config = { matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'] };
// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
// };
