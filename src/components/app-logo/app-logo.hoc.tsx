import { AppLogo } from './app-logo.container';

export type TAppLogoProps = {
  customClassName?: string;
  logoColor: 'white' | 'primary';
};

export const WithAppLogo = ({ customClassName, logoColor }: TAppLogoProps) => {
  return <AppLogo customClassName={customClassName} logoColor={logoColor} />;
};
