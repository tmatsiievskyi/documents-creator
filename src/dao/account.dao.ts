import { database } from '@/db';
import { accountsTable } from '@/db/export-schema';
import { hashString } from '@/utils';

export const createAccountDao = async (userId: string, password: string) => {
  const hashedPassword = await hashString(password);

  const account = database
    .insert(accountsTable)
    .values({ userId, accountType: 'email', password: hashedPassword })
    .returning();

  return account;
};
