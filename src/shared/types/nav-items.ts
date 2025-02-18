import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type TNavItem = {
  name: string;
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
};
