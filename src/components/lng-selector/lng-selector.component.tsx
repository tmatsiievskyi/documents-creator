import { DropdownMenu, DropdownMenuTrigger, icons } from '@/ui';
import { Button } from '@/ui/button';
import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export const LngSelector = ({ children }: TProps) => {
  const Globe = icons['Globe'];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button
          id="language"
          aria-labelledby="language"
          variant="outline"
          size="icon"
          className="p-2 [&>svg]:!size-5"
        >
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
};
