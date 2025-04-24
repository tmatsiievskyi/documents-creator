import { database } from '@/db';
import { accountsTable } from '@/db/export-schema';
import { createDaoLogger, withPerfomanceLogger } from '@/lib/logger/logger';
import { errorHandler } from '@/utils';
import { hashString } from '@/utils/crypting.util';
import { eq } from 'drizzle-orm';

const logger = createDaoLogger('account.dao');

export const createAccountDao = async (userId: string, password: string) => {
  return await withPerfomanceLogger(
    async () => {
      logger.debug({ userId }, 'Creating account by userId');
      try {
        const hashedPassword = await hashString(password);
        const [account] = await database
          .insert(accountsTable)
          .values({ userId, accountType: 'email', password: hashedPassword })
          .onConflictDoNothing()
          .returning();
        logger.debug({ userId, accountId: account.id }, 'Account created');

        return account;
      } catch (error) {
        logger.error(
          {
            error: errorHandler(error),
            stack: error instanceof Error ? error.stack : undefined,
            table: 'doc_accounts',
          },
          'Database error during account creation'
        );
        throw error;
      }
    },
    logger,
    'doc_accounts_insert'
  );
};

export const createAccountByGoogleDao = async (userId: string, googleId: string) => {
  logger.info({ userId, googleId }, 'DAO. Creating account by Google');

  try {
    const acc = await database
      .insert(accountsTable)
      .values({
        userId,
        accountType: 'google',
        googleId,
      })
      .onConflictDoNothing()
      .returning();

    return acc;
  } catch (error) {
    logger.error({
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      table: 'doc_accounts',
    });
    throw error;
  }
};

export const getAccountByGoogleIdDao = async (googleId: string) => {
  logger.debug({ googleId }, 'DAO. Get account by googleId');
  const acc = await database.query.accountsTable.findFirst({
    where: eq(accountsTable.googleId, googleId),
  });

  logger.info({ googleId, acc }, 'DAO. Found account by googleId');
  return acc;
};
