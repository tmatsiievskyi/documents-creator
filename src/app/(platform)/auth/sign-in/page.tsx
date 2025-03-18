import { WithSocialAuth } from '@/components/forms';
import { Divider, icons } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { SignInMagicForm } from './sign-in_magic.form';

const SignIn = () => {
  const EmailIcon = icons['Mail'];
  return (
    <>
      <h2 className="form-title mb-2">Sign in</h2>
      <p className="body-2 mb-4 text-gray-500">
        Sign in to your account using one of the options below.
      </p>
      <WithSocialAuth />
      <Divider text="Sign in with Email" wrapperClassName="my-4" />
      <SignInMagicForm />
      <Divider text="other options" wrapperClassName="my-4" />
      <div>
        <Button variant="ghost">
          <EmailIcon />
          <Link href="/sign-in/email">Sign in with Email and Password</Link>
        </Button>
      </div>
    </>
  );
};

export default SignIn;
