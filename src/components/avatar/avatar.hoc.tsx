'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  icons,
} from '@/ui';
import { AvatarComponent } from './avatar.component';
import { signOutAction } from '@/app/[locale]/(platform)/auth/sign-in/actions';
import { useTranslations } from 'next-intl';
import { TFullUser } from '@/shared/types';
import { Link } from '@/lib/i18n';
import { LngOptions } from '../lng-selector';
import { SidebarMenuButton, useSidebar } from '@/ui/sidebar';

export const WithAvatar = ({ user }: { user: TFullUser }) => {
  const { isMobile } = useSidebar();

  const t = useTranslations('header.avatar');
  const LogOutIcon = icons['LogOut'];
  const Globe = icons['Globe'];
  const UserProfileEdit = icons['UserRoundPen'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <AvatarComponent profile={user?.userProfile} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.userProfile?.fullName}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <AvatarComponent />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.userProfile?.fullName}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserProfileEdit />
            <Link href="/settings">
              <p>{t('your_profile')}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe />
              {t('language')}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <LngOptions />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onSelect={() => signOutAction()}>
            <LogOutIcon />
            <p>{t('sign_out')}</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
