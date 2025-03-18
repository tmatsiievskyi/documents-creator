'use client';

import { WithSidebar } from '@/components/sidebar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className=" h-svh w-full bg-primary/15 p-1 md:p-3">
      <section className="flex h-full flex-col overflow-hidden  rounded-2xl md:flex-row">
        <WithSidebar />
        <div className="flex grow flex-col overflow-hidden md:ml-2">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
