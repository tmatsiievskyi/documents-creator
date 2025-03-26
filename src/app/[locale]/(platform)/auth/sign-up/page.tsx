import { SignUpForm } from '@/components/forms/auth';
import { useTranslations } from 'next-intl';

const SignUpPage = () => {
  const t = useTranslations('sign_up_page');
  return (
    <>
      <h2 className="form-title mb-6">{t('title')}</h2>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
