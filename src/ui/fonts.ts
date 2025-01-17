import { Inter, Geist, Geist_Mono } from 'next/font/google';

export const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter' });
export const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
