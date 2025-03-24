import { database } from '@/db';
import { accountsTable } from '@/db/export-schema';
import { createDaoLogger, withPerfomanceLogger } from '@/lib/logger/logger';
import { hashString } from '@/utils';

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
          .returning();
        logger.debug({ userId, accountId: account.id }, 'Account created');

        return account;
      } catch (error) {
        logger.error(
          {
            error: error instanceof Error ? error.message : String(error),
            table: 'doc_accounts',
            operation: 'insert',
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
