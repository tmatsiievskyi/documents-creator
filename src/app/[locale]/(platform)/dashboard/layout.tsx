import { WithHeader } from '@/components/header';
import { WithSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/ui/sidebar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <main className=" flex h-svh w-full flex-col bg-muted p-1 md:p-3">
        <WithHeader customClassName="relative mb-2 rounded-2xl bg-background" insideApp={true} />
        <section className="flex h-full flex-col overflow-hidden  rounded-2xl shadow md:flex-row">
          <WithSidebar location="dashboard" />
          <div className="flex grow flex-col overflow-hidden md:ml-2">{children}</div>
        </section>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
