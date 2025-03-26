import { WithSocialAuth } from '@/components/forms';
import { Divider, icons } from '@/ui';
import { Button } from '@/ui/button';
import { SignInMagicForm } from './sign-in_magic.form';
import { URL_SIGN_IN_EMAIL } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';
// import Link from 'next/link';

const SignIn = () => {
  const EmailIcon = icons['Mail'];
  const t = useTranslations('sing-in_page');
  return (
    <>
      <h2 className="form-title mb-6">{t('title')}</h2>
      <p className="body-2 mb-4 text-gray-500">{t('description')}</p>
      <WithSocialAuth />
      <Divider text={t('divider_sign_in')} wrapperClassName="my-4" />
      <SignInMagicForm />
      <Divider text={t('divider_other_options')} wrapperClassName="my-4" />
      <div>
        <Button variant="ghost">
          <EmailIcon />
          <Link href={URL_SIGN_IN_EMAIL}>{t('button')}</Link>
        </Button>
      </div>
    </>
  );
};

export default SignIn;
