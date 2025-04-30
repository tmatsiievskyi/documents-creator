import { CompanyInfoForm, InfoFormFallback } from '@/components/forms/company';
import { Suspense } from 'react';
import { getCompanyInfoAction } from './actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { icons } from '@/ui';
import { localDateFromUTC } from '@/utils';

type TPageProps = { params: Promise<{ companyId: string }> };

const CompanyInfoPage = async ({ params }: TPageProps) => {
  return (
    <div className="container flex h-full max-w-4xl flex-col py-10">
      <Suspense fallback={<InfoFormFallback />}>
        <CompanyAction params={params} />
      </Suspense>
    </div>
  );
};

async function CompanyAction({ params }: TPageProps) {
  const BuildingIcon = icons['Building2'];
  const t = await getTranslations('forms.create_edit_view_company');
  const { companyId } = await params;
  const [result] = await getCompanyInfoAction({ companyId });

  const { company, isOwnerOrAdmin } = result || {};

  if (!company) {
    notFound();
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <BuildingIcon className="size-10 text-primary" />
        <h1 className="h1 ml-2">{company.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('card_title')}</CardTitle>
          <CardDescription>{t('description_info')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyInfoForm
            company={company}
            isOwnerOrAdmin={isOwnerOrAdmin || false}
            companyId={companyId}
          />
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-2 text-muted-foreground">
            {t('last_update')} {localDateFromUTC(company.updated_at)}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default CompanyInfoPage;
