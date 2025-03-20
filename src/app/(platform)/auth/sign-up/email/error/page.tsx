import { URL_SIGN_UP } from '@/shared/constants';
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';

const SignUpEmailTokenErrorPage = () => {
  return (
    <div className="auth-form">
      <h1 className="h1">Expired Token</h1>
      <p className="text-xl">
        Sorry, this token was either expired or already used. Please try sign up in again
      </p>
      <Divider text="Back to sign in page" wrapperClassName="my-4" />
      <Button asChild className="primary-btn w-full">
        <Link href={URL_SIGN_UP}>Sign Up</Link>
      </Button>
    </div>
  );
};

export default SignUpEmailTokenErrorPage;
