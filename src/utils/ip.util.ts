'use server';

import { headers } from 'next/headers';

export const getIp = async () => {
  const hdrs = await headers();
  const forwardedFor = hdrs.get('x-forwarded-for');
  const realIp = hdrs.get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
};
