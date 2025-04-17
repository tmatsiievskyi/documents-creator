'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/ui/sidebar';
import { WithAppLogo } from '../app-logo';
import { Link, usePathname } from '@/lib/i18n';
import { useTranslations } from 'next-intl';
import { TSidebarProps } from './sidebar.hoc';
import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';
import { icons } from '@/ui';

export type TSidebarItem = {
  name: string;
  type?: string;
  shouldHaveCompany?: boolean;
  items: {
    name: string;
    href: string | null;
  }[];
};

type TProps = {
  navData: TSidebarItem[];
  customClassName?: string;
  dynamicNavigationItems?: React.ReactElement | null;
  avatar?: React.ReactElement | null;
} & React.ComponentProps<typeof Sidebar> &
  Pick<TSidebarProps, 'location'>;

export function SidebarContainer({ ...props }: TProps) {
  const {
    navData,
    location,

    customClassName,
    avatar,
    dynamicNavigationItems,
    ...restProps
  } = props;

  return (
    <Sidebar {...restProps} className={cn('', customClassName)}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <WithAppLogo
              logoColor="primary"
              customClassName="[&>svg]:size-14 [&>h3]:text-4xl py-0"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarNavigationRender data={navData} location={location} />
          {dynamicNavigationItems}
        </SidebarGroup>
      </SidebarContent>
      {avatar && <SidebarFooter>{avatar}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}

export const SidebarNavigationRender = ({
  data,
  location,
}: {
  data: TSidebarItem[];
  location: 'settings' | 'dashboard';
}) => {
  const pathname = usePathname();

  const t = useTranslations('sidebar');
  const BuildingIcon = icons['Building2'];

  return (
    <SidebarMenu>
      {data.map(itemParent => {
        return (
          <SidebarMenuItem key={itemParent.name}>
            <SidebarMenuButton asChild className="hover:bg-sidebar">
              <p className="text-3">{t(`${location}.${itemParent.name}.title`)}</p>
            </SidebarMenuButton>
            {itemParent.items?.length ? (
              <SidebarMenuSub className=" pb-2">
                {itemParent.items.map(item => {
                  const isActive = typeof item.href === 'string' && pathname.includes(item.href);
                  return (
                    <SidebarMenuSubItem key={item.name}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        {item.href && item.name === 'create_company' ? (
                          <Button
                            variant="default"
                            className="mx-auto mb-1  !bg-primary !text-primary-foreground hover:!bg-primary/90"
                          >
                            <BuildingIcon className="size-4 !text-primary-foreground" />
                            <Link href={item.href} className="w-full">
                              {t(`${location}.${itemParent.name}.items.${item.name}.title`)}
                            </Link>
                          </Button>
                        ) : item.href ? (
                          <p>
                            <Link href={item.href} className="w-full">
                              {t(`${location}.${itemParent.name}.items.${item.name}.title`)}
                            </Link>
                          </p>
                        ) : (
                          <p>{t(`${location}.items.${item.name}.title`)}</p>
                        )}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
