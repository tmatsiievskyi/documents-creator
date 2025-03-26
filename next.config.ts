import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty'],
  },
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
// const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
