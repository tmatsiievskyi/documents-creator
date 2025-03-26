/* eslint-disable camelcase */
import { env } from '@/lib/env';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { getTranslations } from 'next-intl/server';

export const VerifyEmail = async ({ link }: { link: string }) => {
  const t = await getTranslations('email.magic_link');
  const app_name = `${env.APP_NAME}`;

  return (
    <Html>
      <Head />
      <Preview>{t('preview', { app_name })}</Preview>
      <Tailwind>
        <Body className="bg-gray-100  py-2 font-sans">
          <Container className="mx-auto my-4 max-w-md rounded-lg bg-white p-8 shadow-md">
            <Section className="mt-[20px]">
              <Img
                src={`${env.HOST_NAME}/logo.jpeg`}
                width="200"
                height="50"
                alt={`${env.APP_NAME} logo`}
                className="mx-auto"
              />
            </Section>
            <Section>
              <Heading className="mb-6 text-center text-2xl font-semibold text-gray-800">
                {t('title', { app_name })}
              </Heading>
              <Text className="mb-6 text-center text-gray-600">
                {t('description', { app_name })}
              </Text>
            </Section>

            <Section className="my-8 text-center">
              <Button
                href={link}
                className="rounded-md bg-[#447a9c] px-6 py-3 text-base font-medium text-white no-underline hover:bg-[#447a9c]/80"
              >
                {t('button')}
              </Button>
            </Section>

            <Section className="my-[32px] text-center">
              <Text className="mb-6 text-sm text-gray-500">{t('help')}</Text>

              <Section className="mb-6 overflow-hidden rounded-md bg-gray-50 p-3">
                <Link href={link} className="break-all text-xs text-[#447a9c]">
                  {link}
                </Link>
              </Section>
            </Section>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-center text-xs text-gray-400">{t('not_requested')}</Text>

            <Text className="mt-6 text-center text-xs text-gray-400">
              &copy; {t('date', { date: new Date().getFullYear(), app_name })}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
