import type { Metadata } from 'next';
import { fonts } from '@/ui';
import '../ui/globals.css';

export const metadata: Metadata = {
  title: 'Documents Creator',
  description: 'Documents Creator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${fonts.inter.variable} ${fonts.geistSans.variable} ${fonts.geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
