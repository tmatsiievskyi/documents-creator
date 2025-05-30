import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';

const MagicLinkPage = () => {
  const t = useTranslations('sign_in_magic_page');
  return (
    <div className="auth-form flex h-full flex-col justify-between">
      <h1 className="h1 mb-4 text-center">{t('title')}</h1>
      <p className="text-1 text-center">{t('description')}</p>
      <div>
        <Divider text={t('divider_back')} wrapperClassName="my-4" />
        <Button className="w-full" asChild>
          <Link href="/sign-in">{t('button')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default MagicLinkPage;
