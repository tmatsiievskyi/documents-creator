'use client';

import { Header } from './header.container';
import { Link } from '@/lib/i18n';
import { WithLngSelector } from '../lng-selector';
import { Button } from '@/ui/button';
import { URL_SIGN_IN } from '@/shared/constants';
import { SidebarTrigger } from '@/ui/sidebar';
import { Separator } from '@/ui/separator';
import { HeaderTextHelper } from './header-text.helper';

export type TProps = {
  customClassName?: string;
  insideApp: boolean;
};

export const WithHeader = ({ customClassName, insideApp = false }: TProps) => {
  const headerContent = () =>
    insideApp ? (
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">
          <HeaderTextHelper />
        </h1>
      </div>
    ) : (
      // </header>
      <div className="flex">
        <WithLngSelector />
        <Button variant="outline" className="ml-2">
          <Link href={URL_SIGN_IN}>Sign in</Link>
        </Button>
      </div>
    );

  return <Header customClassName={customClassName}>{headerContent()}</Header>;
};
