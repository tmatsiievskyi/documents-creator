import { NextRequest, NextResponse } from 'next/server';
import { cookieMiddleware } from './middlewares';

function middleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/auth')) {
    return cookieMiddleware(req);
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  return response;
}

export default middleware;

export const config = {
  matcher: ['/auth/:path*'],
};
