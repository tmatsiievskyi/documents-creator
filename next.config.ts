import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
// const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
