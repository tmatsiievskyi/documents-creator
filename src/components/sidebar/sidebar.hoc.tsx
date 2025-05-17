import { settingsItemsData } from './items';
import { SidebarContainer, SidebarNavigationRender, TSidebarItem } from './sidebar.container';
import { Suspense } from 'react';
import { SidebarActionFallback } from './sidebar-actions.fallback';
import { WithAvatar } from '../avatar';
import { Avatar, AvatarFallback } from '@/ui';
import { getUserAction } from './actions';

export type TSidebarProps = {
  location: 'settings' | 'dashboard';
  customClassName?: string;
  variant?: 'sidebar' | 'floating' | 'inset';
};

export const WithSidebar = ({ location, customClassName, variant = 'inset' }: TSidebarProps) => {
  const renderContent = () => {
    if (location === 'settings') {
      const staticData = settingsItemsData.reduce((acc, cur) => {
        if (cur.type === 'static') {
          acc.push({
            ...cur,
            items: cur.items.map(item => {
              const newItem: { name: string; href: string | null } = {
                name: item.name,
                href: typeof item.href === 'string' ? item.href : null,
              };
              return newItem;
            }),
          });
        }

        return acc;
      }, [] as Array<TSidebarItem>);

      return (
        <div className="flex flex-col">
          <SidebarContainer
            navData={staticData}
            location="settings"
            customClassName={customClassName}
            variant={variant}
            dynamicNavigationItems={
              <Suspense fallback={<SidebarActionFallback />}>
                <SettingsSidebarAction />
              </Suspense>
            }
            avatar={
              <Suspense
                fallback={
                  <Avatar>
                    <AvatarFallback />
                  </Avatar>
                }
              >
                <AvatarQuery />
              </Suspense>
            }
          ></SidebarContainer>
        </div>
      );
    } else if (location === 'dashboard') {
      return null;
    }
  };

  return <>{renderContent()}</>;
};

async function SettingsSidebarAction() {
  const [user] = await getUserAction();

  if (!user) return null;
  let dataToRender: TSidebarItem[] | null = null;

  if (!user.ownedCompanies?.length && !user.companyMemberships?.length) {
    dataToRender = settingsItemsData.reduce((acc, cur) => {
      if (cur.type === 'dynamic' && !cur.shouldHaveCompany) {
        const newItem = {
          ...cur,
          items: cur.items.map(item => ({
            name: item.name,
            href:
              typeof item.href === 'string'
                ? item.href
                : typeof item.href === 'function'
                  ? null
                  : null,
          })),
        };
        acc.push(newItem);
      }

      return acc;
    }, [] as TSidebarItem[]);
  } else {
    const { companyMemberships } = user;

    if (!companyMemberships) return null; // TODO: get selected company

    const { company } = companyMemberships[0];

    if (!company) return null;

    const val = settingsItemsData.reduce((acc, cur) => {
      if (cur.type === 'dynamic' && cur.shouldHaveCompany) {
        const newItem = {
          ...cur,
          items: cur.items.map(item => ({
            name: item.name,
            href:
              typeof item.href === 'string'
                ? item.href
                : typeof item.href === 'function'
                  ? item.href(company.id)
                  : null,
          })),
        };

        acc.push(newItem as TSidebarItem);
      }

      return acc;
    }, [] as TSidebarItem[]);

    dataToRender = val;
  }

  if (!dataToRender) return null;

  return <SidebarNavigationRender data={dataToRender} location="settings" />;
}

async function AvatarQuery() {
  const [user] = await getUserAction();
  if (!user) return null;

  return <WithAvatar user={user} />;
}
