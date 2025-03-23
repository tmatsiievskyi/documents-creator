import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { fonts, TooltipProvider } from '@/ui';
import NextTopLoader from 'nextjs-toploader';
import '../ui/globals.css';

export const metadata: Metadata = {
  title: 'Documents Creator',
  description: 'Documents Creator',
};

// import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

// export const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.inter.className}  antialiased`}>
        <Toaster />
        <NextTopLoader showSpinner={false} />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
