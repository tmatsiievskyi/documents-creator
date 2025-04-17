import { WithHeader } from '@/components/header';
import { EditorIllustration } from '@/components/illustrations';
import { MARKETING_EDITOR_OPT } from '@/shared/constants';
import { fonts } from '@/ui';
import { useLocale, useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('marketing');
  const localeValue = useLocale();
  const locale: keyof typeof MARKETING_EDITOR_OPT =
    localeValue === 'en' || localeValue === 'ua' ? localeValue : 'en';
  const editorMessage = t('info.editor.editor_message');
  const editorText = t('info.editor.editor_text').replace(/\(\(/g, '{{').replace(/\)\)/g, '}}');
  const editorOptions = MARKETING_EDITOR_OPT[locale];
  return (
    <div className=" h-svh w-full">
      <WithHeader insideApp={false} />
      <div className="container">
        <div className=" flex min-h-svh flex-col items-center justify-center px-12">
          <h1 className={`mb-12 text-center text-6xl font-extrabold  ${fonts.inter.className}`}>
            {t.rich('title', {
              highlited: chunks => <span className="text-brand">{chunks}</span>,
            })}
          </h1>
          <h3 className={`text-1 mb-24 text-center ${fonts.inter.className}`}>
            {t('short-description')}
          </h3>
          <div className="flex w-full items-center">
            <EditorIllustration
              editorMessage={editorMessage}
              editorText={editorText}
              editorOptions={editorOptions}
            />
            <div className="ml-8 max-w-96">
              <h4 className="h2 mb-2 text-brand">{t('info.editor.title')}</h4>
              <p className="text-2 ">{t('info.editor.description')}</p>
            </div>
          </div>
        </div>
        {/* <div className="min-h-svh "> */}
        {/* <div className="grid gap-6 md:grid-cols-3">
            <WithAnimatedIllustration
              title="Smart Templates"
              description="Start with professionally designed templates for any purpose."
              delay={0}
            >
              <TemplatesIllustration />
            </WithAnimatedIllustration>
            <WithAnimatedIllustration
              title="Smart Templates"
              description="Start with professionally designed templates for any purpose."
              delay={0}
            >
              <AutocompleteIllustration />
            </WithAnimatedIllustration>
            <WithAnimatedIllustration
              title="Smart Templates"
              description="Start with professionally designed templates for any purpose."
              delay={0}
            >
              <SignatureIllustration />
            </WithAnimatedIllustration> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
