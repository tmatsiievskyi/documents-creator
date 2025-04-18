import { URL_SIGN_IN } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';

const MagicLinkTokneErrorPage = () => {
  const t = useTranslations('sign_in_magic_page_error');
  return (
    <div className="auth-form flex h-full flex-col justify-between">
      <h1 className="h1 mb-4 text-center">{t('title')}</h1>
      <p className="text-1 text-center">{t('description')}</p>
      <div>
        <Divider text={t('divider_back')} wrapperClassName="my-4" />
        <Button asChild className="w-full">
          <Link href={URL_SIGN_IN}>{t('button')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default MagicLinkTokneErrorPage;
