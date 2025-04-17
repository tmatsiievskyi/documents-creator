import { WithHeader } from '@/components/header';
import { WithSidebar } from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/ui/sidebar';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <WithSidebar location="settings" customClassName="[&>div]:border-r-0 h-full" />
      <SidebarInset>
        <WithHeader insideApp={true} customClassName=" relative" />
        <div className="size-full  bg-background">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
