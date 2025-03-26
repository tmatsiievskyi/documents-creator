import { Button } from '@/ui/button';
import { WithAppLogo } from '../app-logo';
import { Link } from '@/lib/i18n';
// import Link from 'next/link';
import { URL_SIGN_IN } from '@/shared/constants';
import { WithLngSelector } from '../lng-selector';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-4 shadow">
      <WithAppLogo logoColor="primary" customClassName="[&>svg]:size-14 [&>h3]:text-4xl" />
      <div className="flex">
        <WithLngSelector />
        <Button variant="outline" className="ml-2">
          <Link href={URL_SIGN_IN}>Sign in</Link>
        </Button>
      </div>
    </header>
  );
};
