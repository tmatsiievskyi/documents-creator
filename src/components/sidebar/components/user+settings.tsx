import { icons } from '@/ui';

export const UserPlusSettings = () => {
  const UserIcon = icons['CircleUserRound'];
  const SettingsIcon = icons['Settings'];
  return (
    <>
      <SettingsIcon
        className='w-7 h-7 md:w-8 md:h-8 mr-2 md:mr-0 md:mb-2'
        strokeWidth='0.5px'
      />
      <UserIcon className='w-11 h-11 md:w-12 md:h-12' strokeWidth='0.3px' />
    </>
  );
};
