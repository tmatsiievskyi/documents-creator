import { SESSION_AUTH_COOKIE_NAME, URL_AFTER_LOGIN } from '@/shared/constants';
import { NextRequest, NextResponse } from 'next/server';

// TODO: rewrite. Check Next middleware runtime
export const cookieMiddleware = async (req: NextRequest) => {
  const sessionCookie = req.cookies.get(SESSION_AUTH_COOKIE_NAME)?.value;

  if (sessionCookie) {
    return NextResponse.redirect(new URL(URL_AFTER_LOGIN, req.url));
  }

  return NextResponse.next();
};
