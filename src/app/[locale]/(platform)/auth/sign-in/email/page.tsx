import { SignInEmailForm } from '@/components/forms';
import { useTranslations } from 'next-intl';

const SignInEmailPage = () => {
  const t = useTranslations('sign-in-email_page');
  return (
    <>
      <h2 className="form-title mb-6">{t('title')}</h2>
      <SignInEmailForm />
    </>
  );
};

export default SignInEmailPage;
