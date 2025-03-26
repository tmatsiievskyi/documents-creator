import { getDocumentsByCompanyService } from '@/services/documents';

const Page = async () => {
  const documentsByCompanyId = await getDocumentsByCompanyService(
    '027e73d8-c59f-4029-aeb5-45baecfcce63'
  ); // TODO: remove

  return (
    <div>
      {documentsByCompanyId.map(item => (
        <p key={item.id}>{item.id}</p>
      ))}
      <p>Documents</p>
    </div>
  );
};

export default Page;
