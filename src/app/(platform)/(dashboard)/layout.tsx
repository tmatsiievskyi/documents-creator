'use client';

import { WithSidebar } from '@/components/sidebar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className=' bg-primary/15 w-full h-[100svh] p-2 md:p-3'>
      <section className='flex flex-col md:flex-row h-full  overflow-hidden rounded-2xl'>
        <WithSidebar />
        <div className='flex flex-col flex-grow overflow-hidden md:ml-2'>
          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
