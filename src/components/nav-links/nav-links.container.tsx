'use client';

import { cn } from '@/lib/utils';
import { navLinks } from '@/shared/app-data';
import { LinkLocal, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { usePathname } from 'next/navigation';

export const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <LinkLocal
                href={link.href}
                className={cn(
                  `flex flex-col self-center justify-start items-center min-w-[75px] px-2 md:px-0 md:py-3  group relative`
                )}
              >
                <span
                  className={cn('hidden', {
                    ' md:inline absolute bottom-0 right-0 h-px w-[30px] bg-secondary/80 translate-x-[-22px]':
                      index < navLinks.length - 1,
                  })}
                ></span>
                <div
                  className={cn(
                    'cursor-pointer text-center  max-w-12 max-h-12 transition ease-in-out delay-100 duration-300 hover:bg-secondary p-2 rounded-lg group-hover:bg-primary/20 group-hover:text-white',
                    {
                      'bg-primary/40 text-white group-hover:bg-primary/40': pathname === link.href,
                    },
                    {
                      'rounded-full': link.name === 'Create Document',
                    }
                  )}
                >
                  <LinkIcon className="size-6 md:size-7" strokeWidth="1px" />
                </div>

                <span className="mt-1 inline max-w-20 text-center text-xs md:hidden">
                  {link.label}
                </span>
              </LinkLocal>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="flex max-w-12 flex-col items-center justify-center text-center">
                <p>{link.label}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};
