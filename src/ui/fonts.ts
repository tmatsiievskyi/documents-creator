import { Inter, Geist, Geist_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter' });
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const fonts = {
  inter,
  geistMono,
  geistSans,
};
