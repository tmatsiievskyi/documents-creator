import { ReactNode } from 'react';
import { LinkProps } from 'next/link';
import { Link } from '@/lib/i18n';

export type TLinkProps = {
  children: ReactNode;
  className?: string;
  to?: string;
  locale?: string;
} & LinkProps;

export const LinkLocal = ({ className, href, children, ...props }: TLinkProps) => {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};
