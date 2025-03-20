import { database } from '@/db';
import { accountsTable, TUser, usersTable } from '@/db/export-schema';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {
  const user = await database.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
};

export const createUserByMagicLink = async (email: string) => {
  const [user] = await database
    .insert(usersTable)
    .values({ email, emailVerified: new Date() })
    .returning();

  await database.insert(accountsTable).values({ userId: user.id, accountType: 'email' });

  return user;
};

export const createUserDao = async (email: string) => {
  const [user] = await database.insert(usersTable).values({ email }).returning();

  return user;
};

export const setEmailVerified = async (userId: string) => {
  await database
    .update(usersTable)
    .set({ emailVerified: new Date() })
    .where(eq(usersTable.id, userId));
};

export const updateUserByIdDao = async (userId: string, updData: Partial<TUser>) => {
  await database.update(usersTable).set(updData).where(eq(usersTable.id, userId));
};
