import { Link } from '@/lib/i18n';
import { URL_DASHBOARD, URL_SETTINGS_PROFILE } from '@/shared/constants';
import { icons } from '@/ui';
import { Button } from '@/ui/button';
import FlippingIcon from '@/ui/icons/icons-componets/flipping-icon.component';
import { getTranslations } from 'next-intl/server';

const NotFoundPage = async () => {
  const t = await getTranslations('404.settings');
  const SquirrelIcon = icons['Squirrel'];
  return (
    <div className="container flex h-full max-w-4xl flex-col items-center justify-center py-10">
      <h1 className="h1 tracking-tight">{t('title')}</h1>
      <div>
        <FlippingIcon>
          <SquirrelIcon className="my-5 size-60 text-brand" strokeWidth={0.5} />
        </FlippingIcon>
      </div>

      <p className="text-1 mb-6 max-w-[440px] text-center text-muted-foreground">
        {t('description')}
      </p>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href={URL_DASHBOARD}>{t('button_dashboard')}</Link>
        </Button>

        <Button variant="outline" size="lg" asChild>
          <Link href={URL_SETTINGS_PROFILE}>{t('button_profile')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
