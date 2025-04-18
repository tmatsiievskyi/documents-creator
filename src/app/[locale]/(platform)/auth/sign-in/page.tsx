import { WithSocialAuth } from '@/components/forms';
import { Divider, icons } from '@/ui';
import { Button } from '@/ui/button';
import { SignInMagicForm } from './sign-in_magic.form';
import { URL_SIGN_IN_EMAIL } from '@/shared/constants';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';

const SignIn = () => {
  const EmailIcon = icons['Mail'];
  const t = useTranslations('sing-in_page');
  return (
    <>
      <h2 className="form-title mb-4">{t('title')}</h2>
      <p className="text-2 mb-4 text-muted-foreground">{t('description')}</p>
      <SignInMagicForm />
      <Divider text={t('divider_social')} wrapperClassName="my-4" textClassName="text-brand" />
      <WithSocialAuth />
      <Divider
        text={t('divider_other_options')}
        wrapperClassName="my-4"
        textClassName="text-brand"
      />

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
