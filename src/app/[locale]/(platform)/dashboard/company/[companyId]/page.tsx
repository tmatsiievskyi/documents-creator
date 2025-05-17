import { getTranslations } from 'next-intl/server';
import { getCompanyByIdService } from '@/services/company.service';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';

type TPageProps = Promise<{ companyId: string }>;

export default async function CompanyDashboardPage({ params }: { params: TPageProps }) {
  const t = await getTranslations('dashboard');
  const { companyId } = await params;
  const company = await getCompanyByIdService(companyId, {
    includeMembers: true,
  });

  if (!company) {
    notFound();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_documents')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Company documents list */}</CardContent>
      </Card>

      {/* Recent Templates */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_templates')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Company templates list */}</CardContent>
      </Card>

      {/* Recent Variables */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_variables')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Company variables list */}</CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>{t('activity_feed')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Company activity feed */}</CardContent>
      </Card>
    </div>
  );
}
