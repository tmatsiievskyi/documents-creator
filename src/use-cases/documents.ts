import { getDocumentsBy } from '@/dao/document.dao';

export const getDocumentsByCompanyUseCase = async (companyId: string) => {
  // TODO: rewrite
  const documents = await getDocumentsBy(companyId);
  return documents;
};
