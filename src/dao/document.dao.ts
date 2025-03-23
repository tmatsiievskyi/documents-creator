import { database } from '@/db';
import { documentsTable } from '@/db/export-schema';
import { eq } from 'drizzle-orm';

export const getDocumentsBy = async (companyId: string) => {
  return await database
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.ownerCompanyId, companyId));
};
