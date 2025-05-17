import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getCompanyByIdService } from '@/services/company.service';
// import { getUserAction } from '@/lib/zsa/actions/user.action';
import { WithHeader } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/ui/sidebar';
import { WithSidebarDashboard } from '@/components/sidebar/sidebar-dashboard.hoc';

type TDashboardLayoutProps = {
  children: ReactNode;
  params: Promise<{
    companyId?: string;
  }>;
};

export default async function DashboardLayout({ children, params }: TDashboardLayoutProps) {
  // const [user] = await getUserAction();

  // if (!user) {
  //   notFound();
  // }
  const { companyId } = await params;
  // If companyId is provided, verify company exists
  if (companyId) {
    const company = await getCompanyByIdService(companyId, {
      includeMembers: true,
    });

    if (!company) {
      notFound();
    }
  }

  return (
    <SidebarProvider>
      <WithSidebarDashboard />
      <SidebarInset className=" bg-sidebar p-1 md:p-[12px]">
        <div className="bg-background h-full rounded-xl shadow">
          <WithHeader insideApp={true} customClassName="" />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
