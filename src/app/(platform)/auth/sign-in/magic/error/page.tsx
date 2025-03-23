import { URL_SIGN_IN } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';

const MagicLinkTokneErrorPage = () => {
  return (
    <div className="auth-form">
      <h1 className="h1 mb-4 text-center">Expired Token</h1>
      <p className="text-1 text-center">
        Sorry, this token was either expired or already used. Please try logging in again
      </p>
      <Divider text="Back to sign in page" wrapperClassName="my-4" />
      <Button asChild className="primary-btn w-full">
        <Link href={URL_SIGN_IN}>Sign In</Link>
      </Button>
    </div>
  );
};

export default MagicLinkTokneErrorPage;
