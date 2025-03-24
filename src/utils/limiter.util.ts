import { RateLimitError } from '@/shared/app-errors';
import { getIp } from './ip.util';

type TLimiterProps = {
  key?: string;
  limit?: number;
  window?: number;
};

const PRUNE_INTERVAL = 60 * 1000;

const trackers: Record<string, { count: number; expiresAt: number }> = {};

const pruneTrackers = () => {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].expiresAt < now) {
      delete trackers[key];
    }
  }
};

setInterval(pruneTrackers, PRUNE_INTERVAL);

export const rateLimitByIp = async ({ key, limit, window }: TLimiterProps) => {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
};

export const rateLimitByKey = async ({
  key = 'global',
  limit = 1,
  window = 10000,
}: TLimiterProps) => {
  const tracker = trackers[key] || { count: 0, expiresAt: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    throw new RateLimitError();
  }
};
