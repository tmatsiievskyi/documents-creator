import { Inter, Geist, Geist_Mono as GeistMono, Birthstone } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter' });
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});
const geistMono = GeistMono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const birthstone = Birthstone({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-birthstone',
});

export const fonts = {
  inter,
  geistMono,
  geistSans,
  birthstone,
};
