'use client';

import { URL_SIGN_IN } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignOut = () => {
  const t = useTranslations('sign_out_page');
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="auth-form">
      <h3 className="h1 text-center">{t('title')}</h3>
      <p className="text-1 text-center">{t('description')}</p>
      <Divider text={t('divider_back')} wrapperClassName="my-4" />
      <Button className="primary-btn w-full" asChild>
        <Link href={URL_SIGN_IN}>{t('button')}</Link>
      </Button>
    </div>
  );
};

export default SignOut;
