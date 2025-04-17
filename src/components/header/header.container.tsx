import { cn } from '@/lib/utils';
import { TProps } from './header.hoc';
import { ReactElement } from 'react';

export const Header = ({
  customClassName,
  children,
}: Omit<TProps, 'insideApp'> & { children: ReactElement }) => {
  return (
    <header
      className={cn(
        'group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear',
        customClassName
      )}
    >
      {children}
    </header>
  );
};
