import { SignUpForm } from '@/components/forms/auth';
import { useTranslations } from 'next-intl';

const SignUpPage = () => {
  const t = useTranslations('sign_up_page');
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="form-title mb-6">{t('title')}</h2>
        <p className="text-2 mb-4 text-muted-foreground">{t('description')}</p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
