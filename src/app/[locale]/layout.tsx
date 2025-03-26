import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { fonts, TooltipProvider } from '@/ui';
import NextTopLoader from 'nextjs-toploader';
import '../../ui/globals.css';

export const metadata: Metadata = {
  title: 'Documents Creator',
  description: 'Documents Creator',
};

import { Toaster } from 'sonner';
import { NextIntlClientProvider } from 'next-intl';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // if (!hasLocale(localeRouting.locales, locale)) {
  //   notFound();
  // }

  return (
    <html lang={locale}>
      <body className={`${fonts.inter.className}  antialiased`}>
        <NextIntlClientProvider>
          <Toaster />
          <NextTopLoader showSpinner={false} />
          <TooltipProvider>{children}</TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
