import { ReactNode } from 'react';
import { WithAppLogo } from '@/components/app-logo';

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex h-svh flex-col">
        <section className="flex flex-1 flex-col items-center justify-center bg-white p-4 py-10  lg:p-10 lg:py-0">
          <WithAppLogo logoColor="primary" customClassName="justify-center mb-14" />

          <div className="w-full max-w-md text-center">{children}</div>
        </section>
      </div>
    </>
  );
};

export default Layout;
