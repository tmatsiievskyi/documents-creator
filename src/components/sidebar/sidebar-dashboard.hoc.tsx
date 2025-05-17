import { Avatar, AvatarFallback } from '@/ui/avatar';
import { WithAvatar } from '../avatar';
import { getUserAction } from './actions';
import { SidebarDashboardContainer } from './sidebar-dashboard.container';
import { Suspense } from 'react';

export const WithSidebarDashboard = () => {
  return (
    <SidebarDashboardContainer
      avatar={
        <Suspense
          fallback={
            <Avatar>
              <AvatarFallback />
            </Avatar>
          }
        >
          <AvatarAction />
        </Suspense>
      }
    />
  );
};

async function AvatarAction() {
  const [user] = await getUserAction();
  if (!user) return null;

  return <WithAvatar user={user} />;
}
