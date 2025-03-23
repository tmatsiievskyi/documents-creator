import { URL_SIGN_IN } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';

const MagicLinkPage = () => {
  return (
    <div className="auth-form ">
      <h1 className="h1 mb-4 text-center">Check your email</h1>
      <p className="text-1 text-center">
        We sent you a link to verify your email. Check the link in your email
      </p>
      <Divider text="Back to sign in page" wrapperClassName="my-4" />
      <Button className="primary-btn w-full" asChild>
        <Link href={URL_SIGN_IN}>Sign in</Link>
      </Button>
    </div>
  );
};

export default MagicLinkPage;
