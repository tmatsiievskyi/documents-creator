import { icons } from '@/ui';

export const UserPlusSettings = () => {
  const UserIcon = icons['CircleUserRound'];
  const SettingsIcon = icons['Settings'];
  return (
    <>
      <SettingsIcon className="mr-2 size-7 md:mb-2 md:mr-0 md:size-8" strokeWidth="0.5px" />
      <UserIcon className="size-11 md:size-12" strokeWidth="0.3px" />
    </>
  );
};
