// import { Button } from "@/components/ui/button";
// import { pageTitleStyles } from "@/styles/common";
import { Divider } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';

const MagicLinkPage = () => {
  return (
    <div className="auth-form">
      <h1 className="h1">Expired Token</h1>
      <p className="text-xl">
        Sorry, this token was either expired or already used. Please try logging in again
      </p>
      <Divider text="Back to sign in page" wrapperClassName="my-4" />
      <Button asChild className="primary-btn w-full">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
};

export default MagicLinkPage;
