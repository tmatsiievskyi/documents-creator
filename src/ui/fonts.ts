import { Inter, Birthstone } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter' });

const birthstone = Birthstone({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-birthstone',
});

export const fonts = {
  inter,
  birthstone,
};
