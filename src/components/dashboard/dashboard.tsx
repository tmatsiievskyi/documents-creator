import { TCompany, TUser } from '@/db/export-schema';
import { DashboardHeader } from './dashboard-header';
import { DashboardContent } from './dashboard-content';

type TDashboardProps = {
  user: TUser;
  company?: TCompany;
};

export const Dashboard = ({ user, company }: TDashboardProps) => {
  const isCompanyContext = !!company;

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        title={isCompanyContext ? company.name : 'Personal Dashboard'}
        context={isCompanyContext ? 'company' : 'personal'}
      />
      <DashboardContent
        user={user}
        company={company}
        context={isCompanyContext ? 'company' : 'personal'}
      />
    </div>
  );
};
