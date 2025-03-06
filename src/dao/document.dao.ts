import { database } from '@/db';
import { documents } from '@/db/schema/documents';
import { eq } from 'drizzle-orm';

export const getDocumentsBy = async (companyId: string) => {
  return await database.select().from(documents).where(eq(documents.ownerCompanyId, companyId));
};
