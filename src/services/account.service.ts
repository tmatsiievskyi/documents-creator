import { getAccountByGoogleIdDao } from '@/dao';
import { createServiceLogger } from '@/lib/logger/logger';
import { errorHandler } from '@/utils';

const logger = createServiceLogger('account.service');

export const getAccountByGoogleIdService = async (googleId: string) => {
  try {
    logger.info({ googleId }, 'SERVICE. GET account by googleID');
    const acc = await getAccountByGoogleIdDao(googleId);

    if (acc) {
      logger.info({ accountId: acc.id, googleId }, 'SERVICE. Found account by googleId');
    } else {
      logger.info({ accountId: undefined, googleId }, 'SERVICE. Not Found account by googleId');
    }
    return acc;
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};
