import { icons } from '@/ui';
import { WithNavLinks } from '../nav-links';
import { UserPlusSettings } from './components';

export const Sidebar = () => {
  const LogoIcon = icons['Feather'];
  return (
    <aside className="flex w-full flex-col  justify-between bg-white md:w-auto md:min-w-[96px]">
      <div className="flex w-full justify-between">
        <div className="flex max-w-[96px] flex-col items-center justify-center py-1 pl-2 text-center md:w-full md:py-2 md:pl-0">
          <LogoIcon className="size-10 md:size-12 " strokeWidth="0.5px" />
          <p className="text-sm md:text-base">Documents</p>
        </div>
        <div className="flex items-center justify-center p-2 text-center md:hidden">
          <UserPlusSettings />
        </div>
      </div>

      <div className="w-full bg-primary/15">
        <div className="mt-1 flex w-full justify-evenly overflow-x-scroll bg-white py-2 md:mt-0 md:flex-col md:py-0">
          <WithNavLinks />
        </div>
      </div>

      <div className="hidden flex-col items-center justify-center py-2 text-center md:flex">
        <UserPlusSettings />
      </div>
    </aside>
  );
};
