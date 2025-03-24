import { WithNavLinks } from '../nav-links';
import { UserPlusSettings } from './components';
import { WithAppLogo } from '../app-logo';

export const Sidebar = () => {
  return (
    <aside className="flex w-full flex-col  justify-between bg-white md:w-auto md:min-w-[96px]">
      <div className="flex w-full justify-between px-2 md:px-0">
        <div className="flex max-w-[96px] flex-col items-center justify-center text-center md:w-full">
          <WithAppLogo
            logoColor="primary"
            customClassName=" flex justify-center items-center md:flex-col [&>svg]:size-14 [&>h3]:text-xl md:[&>svg]:size-20 md:[&>svg]:mr-0 md:[&>h3]:text-5xl pl-0"
          />
        </div>
        <div className="flex items-center justify-center text-center md:hidden">
          <UserPlusSettings />
        </div>
      </div>

      <div className="bg-primary/15 w-full">
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
