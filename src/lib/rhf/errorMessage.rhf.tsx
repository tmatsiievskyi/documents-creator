import { PropsWithChildren } from 'react';
import { cn } from '../utils';

type TProps = {
  className?: string;
} & PropsWithChildren;
export const RHFErrorMessage = ({ children, className }: TProps) => {
  return (
    <p
      className={cn('text-xs text-left text-destructive block absolute bottom-[-10px] ', className)}
    >
      {children}
    </p>
  );
};
