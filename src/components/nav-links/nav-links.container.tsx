'use client';

import { cn } from '@/lib/utils';
import { navLinks } from '@/shared/app-data';
import { LinkLocal, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { usePathname } from 'next/navigation';

export const NavLinks = () => {
  const pathname = usePathname();

  // flex h-[48px] margin-y-2 grow items-center justify-center gap-2 bg-bkg p-3 text-sm font-medium hover:bg-bkg/70 hover:text-accent md:flex-none md:justify-start md:p-2 md:px-3

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
                  `block py-3  group`,

                  {
                    ' border-b-[1px] border-secondary/60':
                      index < navLinks.length - 1,
                  }
                )}
              >
                <div
                  className={cn(
                    'cursor-pointer border border-secondary/100 transition ease-in-out delay-100 duration-300 hover:bg-secondary p-2 rounded-lg group-hover:bg-primary/20 group-hover:text-white',
                    {
                      'bg-primary/40 text-white group-hover:bg-primary/40':
                        pathname === link.href,
                    }
                  )}
                >
                  <LinkIcon className='w-7 h-7' strokeWidth='1px' />
                </div>

                {/* <span>{link.label}</span> */}
              </LinkLocal>
            </TooltipTrigger>
            <TooltipContent>
              <div className='flex flex-col justify-center items-center text-center max-w-12'>
                {/* <span>{tooltip}</span>
              {!!shortcutKeys?.length && (
                <span>[{shortcutKeys.join('+')}]</span>
              )} */}
                <p>add</p>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};
