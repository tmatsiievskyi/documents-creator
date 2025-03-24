import { createRequestLogger } from '@/lib/logger/logger';
import { NextRequest, NextResponse } from 'next/server';

export const reqMiddleware = (req: NextRequest, res: NextResponse) => {
  const requestLogger = createRequestLogger();
  const { method } = req;
  const { pathname, search } = req.nextUrl;

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined;

  requestLogger.info(
    {
      method,
      pathname,
      search,
      userAgent: req.headers.get('user-agent'),
      ip,
    },
    `Incoming request to ${pathname}`
  );

  return res;
};
