'use client';

import { WithHeader } from '@/components/header';
import { WithSidebar } from '@/components/sidebar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='flex flex-col md:flex-row h-[100svh] px-2 py-2 overflow-hidden'>
      <WithSidebar />
      <div className='flex flex-col flex-grow overflow-hidden'>
        <WithHeader />
        {children}
      </div>
    </section>
  );
};

export default Layout;
