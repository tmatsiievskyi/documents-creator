import { getTranslations } from 'next-intl/server';
import { getCompanyInfoAction } from '../info/actions';
import { Suspense } from 'react';
import { CompanyMembersTable } from '@/components/app-table/items/company-members.table';
import { CompanyMembersTableFallback } from '@/components/app-table/items/company-members.fallback';
import { InviteCompanyMemberButton } from '@/components/modals';

type TPageProps = { params: Promise<{ companyId: string }> };

const MembersPage = async ({ params }: TPageProps) => {
  const t = await getTranslations('company.members');
  const { companyId } = await params;

  return (
    <div className="container flex h-full max-w-4xl flex-col py-10">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="h1 ml-2">{t('description')}</h1>
        <InviteCompanyMemberButton excludeCompany={companyId} />
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <Suspense fallback={<CompanyMembersTableFallback />}>
          <MembersAction companyId={companyId} />
        </Suspense>
      </div>
    </div>
  );
};

async function MembersAction({ companyId }: { companyId: string }) {
  const [result] = await getCompanyInfoAction({ companyId });
  const { company } = result || {};

  return <CompanyMembersTable data={company?.members} />;
}

export default MembersPage;
