import { database } from '@/db';
import { profilesTable } from '@/db/export-schema';

export const createProfileByUserId = async (userId: string, image?: string) => {
  const profile = await database
    .insert(profilesTable)
    .values({ userId, image })
    .onConflictDoNothing()
    .returning();

  return profile;
};
