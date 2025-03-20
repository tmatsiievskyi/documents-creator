import { database } from '@/db';
import { accountsTable } from '@/db/export-schema';
import { SALT_DIVIDER } from '@/shared/constants';
import { hashString } from '@/utils';

export const createAccountDao = async (userId: string, password: string) => {
  const [salt, hash] = (await hashString(password)).split(SALT_DIVIDER);

  const account = database
    .insert(accountsTable)
    .values({ userId, accountType: 'email', password: hash, salt })
    .returning();

  return account;
};
