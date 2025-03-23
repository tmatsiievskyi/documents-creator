import { signOutAction } from '@/app/(platform)/auth/sign-in/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  icons,
} from '@/ui';

export const UserPlusSettings = () => {
  const UserIcon = icons['CircleUserRound'];
  const SettingsIcon = icons['Settings'];
  const LogOutIcon = icons['LogOut'];
  return (
    <>
      <SettingsIcon className="mr-2 size-7 md:mb-2 md:mr-0 md:size-8" strokeWidth="0.5px" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserIcon className="size-11 md:size-12" strokeWidth="0.3px" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2 bg-white">
          <DropdownMenuItem className="cursor-pointer" onSelect={() => signOutAction()}>
            <LogOutIcon />
            <p>Sign out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
