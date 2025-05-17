'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuAction,
  useSidebar,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroup,
} from '@/ui/sidebar';
import { ComponentProps, ReactElement } from 'react';

import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/ui/dropdown-menu';
import { Folder, MoreHorizontal, PlusCircleIcon } from 'lucide-react';
import { dashboardMenuItems } from './items';
import { WithAppLogo } from '../app-logo';
import { Link, usePathname } from '@/lib/i18n';
import { URL_CREATE_DOCUMENT } from '@/shared/constants';
import { cn } from '@/lib/utils';

export const SidebarDashboardContainer = ({
  avatar,
  ...props
}: ComponentProps<typeof Sidebar> & { avatar: ReactElement | null }) => {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" className="!border-r-0">
      <SidebarContent className="p-2">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <WithAppLogo
                  logoColor="primary"
                  customClassName="[&>svg]:size-14 [&>h3]:text-4xl py-0"
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                  asChild
                >
                  <Link href={URL_CREATE_DOCUMENT} className="flex items-center">
                    <PlusCircleIcon size={16} />
                    <span className="ml-1">Create Document</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
              {dashboardMenuItems.map(item => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'text-1',
                      item.url === pathname && 'text-brand bg-sidebar-accent'
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="!size-5" strokeWidth={1.5} />
                      <span className="text-2">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side={isMobile ? 'bottom' : 'right'}
                      align={isMobile ? 'end' : 'start'}
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>Create</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>Update</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {avatar && <SidebarFooter>{avatar}</SidebarFooter>}
    </Sidebar>
  );
};
