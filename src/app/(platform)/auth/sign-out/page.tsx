'use client';

import { URL_SIGN_IN } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="auth-form">
      <h3 className="h1">Sucessfully Signed out</h3>
      <p className="body-1">You have been successfully signed out.</p>
      <Divider text="Back to sign in page" wrapperClassName="my-4" />
      <Button className="primary-btn w-full" asChild>
        <Link href={URL_SIGN_IN}>Sign in</Link>
      </Button>
    </div>
  );
};

export default SignOut;
