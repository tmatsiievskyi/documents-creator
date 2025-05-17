import { TCompany, TUser } from '@/db/export-schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { useTranslations } from 'next-intl';

type TDashboardContentProps = {
  user: TUser;
  company?: TCompany;
  context: 'personal' | 'company';
};

export const DashboardContent = ({ user, company, context }: TDashboardContentProps) => {
  const t = useTranslations('dashboard'); // TODO: check this translation

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_documents')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Documents list - will be filtered by context */}</CardContent>
      </Card>

      {/* Recent Templates */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_templates')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Templates list - will be filtered by context */}</CardContent>
      </Card>

      {/* Recent Variables */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_variables')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Variables list - will be filtered by context */}</CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>{t('activity_feed')}</CardTitle>
        </CardHeader>
        <CardContent>{/* Activity feed - will be filtered by context */}</CardContent>
      </Card>
    </div>
  );
};
