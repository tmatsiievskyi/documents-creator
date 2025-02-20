import { icons } from '@/ui';
import { WithNavLinks } from '../nav-links';
import { UserPlusSettings } from './components';

export const Sidebar = () => {
  const LogoIcon = icons['Feather'];
  return (
    <aside className='flex flex-col justify-between  w-full md:w-auto md:min-w-[96px] bg-white'>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col justify-center items-center text-center pl-2 md:pl-0 py-1 md:py-2 max-w-[96px] md:w-full'>
          <LogoIcon
            className='w-10 h-10 md:w-12 md:h-12 '
            strokeWidth='0.5px'
          />
          <p className='text-sm md:text-base'>Documents</p>
        </div>
        <div className='flex md:hidden justify-center items-center text-center px-2 py-2'>
          <UserPlusSettings />
        </div>
      </div>

      <div className='bg-primary/15 w-full'>
        <div className='flex md:flex-col justify-evenly w-full py-2 md:py-0 overflow-x-scroll bg-white mt-1 md:mt-0'>
          <WithNavLinks />
        </div>
      </div>

      <div className='hidden md:flex flex-col justify-center items-center text-center py-2'>
        <UserPlusSettings />
      </div>
    </aside>
  );
};
