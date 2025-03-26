import { URL_SIGN_IN } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';
// import Link from 'next/link';

const MagicLinkTokneErrorPage = () => {
  const t = useTranslations('sign_in_magic_page_error');
  return (
    <div className="auth-form">
      <h1 className="h1 mb-4 text-center">{t('title')}</h1>
      <p className="text-1 text-center">{t('description')}</p>
      <Divider text={t('divider_back')} wrapperClassName="my-4" />
      <Button asChild className="primary-btn w-full">
        <Link href={URL_SIGN_IN}>{t('button')}</Link>
      </Button>
    </div>
  );
};

export default MagicLinkTokneErrorPage;
