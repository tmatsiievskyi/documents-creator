import { cn } from '@/lib/utils';
import { APP_UI_NAME } from '@/shared/constants';
import { fonts, icons } from '@/ui';
import { TAppLogoProps } from './app-logo.hoc';

export const AppLogo = ({ customClassName, logoColor = 'white' }: TAppLogoProps) => {
  const Logo = icons['AppLogoWhite'];

  return (
    <div
      className={cn(
        'flex items-center justify-start py-1 pl-2 text-center md:w-full md:py-2 md:pl-0 [&>svg]:size-32',
        customClassName
      )}
    >
      <Logo customClassName="mr-2" colorType={logoColor} />
      <h3 className={cn(`text-left text-7xl font-semibold ${fonts.birthstone.className}`)}>
        {APP_UI_NAME}
      </h3>
    </div>
  );
};
