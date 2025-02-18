import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

export type TLinkProps = {
  children: ReactNode;
  className?: string;
  to?: string;
} & LinkProps;

export const LinkLocal = ({
  className,
  href,
  children,
  ...props
}: TLinkProps) => {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};
