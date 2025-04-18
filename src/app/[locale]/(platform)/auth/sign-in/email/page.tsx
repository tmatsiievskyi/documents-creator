import { SignInEmailForm } from '@/components/forms';
import { useTranslations } from 'next-intl';

const SignInEmailPage = () => {
  const t = useTranslations('sign-in-email_page');
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="form-title mb-6">{t('title')}</h2>
        <p className="text-2 mb-4 text-muted-foreground">{t('description')}</p>
      </div>

      <SignInEmailForm />
    </div>
  );
};

export default SignInEmailPage;
