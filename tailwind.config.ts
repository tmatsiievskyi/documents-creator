import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rootBG: 'hsl(var(--rootBG))',
        primary: 'hsl(var(--primary))',
        'primary-frg': 'hsl(var(--primary-frg))',
        secondary: 'hsl(var(--secondary))',
        dark: 'hsl(var(--dark))',
        light: {
          '100': 'hsl(var(--light-100))',
          '200': 'hsl(var(--light-200))',
          '300': 'hsl(var(--light-300))',
          '400': 'hsl(var(--light-400))',
        },
        muted: {
          '100': 'hsl(var(--muted-100))',
          '200': 'hsl(var(--muted-200))',
        },
        destructive: 'hsl(var(--destructive))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        inputShadow: '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
        soft: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        deeper: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      width: {
        a4: '794px',
      },
      height: {
        a4: '1116.2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
