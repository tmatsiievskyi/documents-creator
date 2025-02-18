import { icons } from '@/ui';
import { WithNavLinks } from '../nav-links';

export const Sidebar = () => {
  const UserIcon = icons['CircleUserRound'];
  const SettingsIcon = icons['Settings'];
  const LogoIcon = icons['Feather'];
  return (
    <aside className='flex md:flex-col justify-between items-center w-full md:w-28 bg-white'>
      <div className='flex flex-col justify-center items-center text-center py-2'>
        <LogoIcon className='w-12 h-12 ' strokeWidth='1px' />
        <p>Document creator</p>
      </div>
      <div className='flex md:flex-col'>
        <WithNavLinks />
      </div>

      <div className='flex flex-col justify-center items-center text-center py-2'>
        <SettingsIcon className='w-6 h-6 mb-2' strokeWidth='1px' />
        <UserIcon className='w-9 h-9' strokeWidth='0.8px' />
      </div>
    </aside>
  );
};
