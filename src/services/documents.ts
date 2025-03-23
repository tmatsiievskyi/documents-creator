import { getDocumentsBy } from '@/dao/document.dao';

export const getDocumentsByCompanyService = async (companyId: string) => {
  // TODO: rewrite
  const documents = await getDocumentsBy(companyId);
  return documents;
};
