import { CreateCompanyForm } from '@/components/forms/company';
import { getUserAction } from '@/components/sidebar/actions';
import { redirect } from '@/lib/i18n';
import { URL_SETTING_COMPANY_INFO } from '@/shared/constants';
import { icons } from '@/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';

import { getLocale, getTranslations } from 'next-intl/server';

const CreateCompanyPage = async () => {
  const [user] = await getUserAction();
  const t = await getTranslations('forms.create_edit_view_company');
  const locale = await getLocale();
  const BuildingIcon = icons['Building2'];

  if (user?.companyMemberships && user?.companyMemberships[0]?.company?.id) {
    return redirect({
      href: URL_SETTING_COMPANY_INFO(user?.companyMemberships[0]?.company?.id),
      locale,
    });
  }

  return (
    <div className="container flex h-full max-w-4xl flex-col py-10">
      <div className="mb-6 flex items-center gap-2">
        <BuildingIcon className="size-8 text-primary" />
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </div>
      <p className="mb-8 text-muted-foreground">{t('description')}</p>

      <Card>
        <CardHeader>
          <CardTitle>{t('card_title')}</CardTitle>
          <CardDescription>{t('card_edit_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCompanyForm />
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-2 text-muted-foreground">
            All company information can be edited after creation.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCompanyPage;
