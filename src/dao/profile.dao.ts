import { database } from '@/db';
import { profilesTable } from '@/db/export-schema';

export const createProfileByUserId = async (userId: string, image?: string, fullName?: string) => {
  const profile = await database
    .insert(profilesTable)
    .values({ userId, image, fullName })
    .onConflictDoNothing()
    .returning();

  return profile;
};
