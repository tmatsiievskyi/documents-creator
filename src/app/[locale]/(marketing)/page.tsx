import { WithHeader } from '@/components/header';
import { fonts } from '@/ui';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('marketing');

  return (
    <div className="h-svh w-full">
      <WithHeader />
      <div className="my-20 px-12">
        <h1 className={`mb-8 text-center text-5xl font-extrabold  ${fonts.geistSans.className}`}>
          {t('title')}
        </h1>
        <h3 className="text-center">{t('short-description')}</h3>
      </div>
    </div>
  );
}
