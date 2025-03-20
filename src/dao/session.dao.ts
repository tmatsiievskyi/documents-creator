import { database } from '@/db';
import { sessionsTable, TSessionInsert, usersTable } from '@/db/export-schema';
import { eq } from 'drizzle-orm';

export const createSessionDao = async (session: TSessionInsert) => {
  await database.insert(sessionsTable).values(session);
};

export const getSessionWithUserById = async (sessionId: string) => {
  const result = await database
    .select({ user: usersTable, session: sessionsTable })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  return result;
};

export const deleteSessionById = async (sessionId: string) => {
  await database.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
};

export const deleteSessionByUserId = async (userId: string) => {
  await database.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
};

export const updateSessionById = async (sessionId: string, updateObj: Partial<TSessionInsert>) => {
  const newSession = await database
    .update(sessionsTable)
    .set(updateObj)
    .where(eq(sessionsTable.id, sessionId))
    .returning();

  return newSession;
};
