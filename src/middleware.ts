import { NextRequest, NextResponse } from 'next/server';
import { cookieMiddleware, reqMiddleware } from './middlewares';

function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/auth')) {
    return authRouteMiddleware(req);
  }

  return defaultMiddleware(req);
}

function authRouteMiddleware(req: NextRequest) {
  let res = NextResponse.next();

  res = reqMiddleware(req, res);
  res = cookieMiddleware(req, res);

  return res;
}

function defaultMiddleware(req: NextRequest) {
  let res = NextResponse.next();

  res = reqMiddleware(req, res);

  return res;
}

export default middleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
