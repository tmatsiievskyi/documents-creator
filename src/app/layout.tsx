import type { Metadata } from 'next';
import { fonts, TooltipProvider } from '@/ui';
import '../ui/globals.css';

export const metadata: Metadata = {
  title: 'Documents Creator',
  description: 'Documents Creator',
};

import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${fonts.inter.className} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
