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

export const MagicLinkEmail = ({
  expiryMinutes,
  link,
}: {
  expiryMinutes: number;
  link: string;
}) => {
  const previewText = `Your secure login link for ${env.APP_NAME}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-2 font-sans">
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
                Login to {env.APP_NAME}
              </Heading>
              <Text className="mb-6 text-center text-gray-600">
                Click the button below to securely log in to your account. This link is valid for{' '}
                {expiryMinutes} minutes and can only be used once.
              </Text>
            </Section>

            <Section className="my-8 text-center">
              <Button
                href={link}
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white no-underline hover:bg-blue-700"
              >
                Login Securely
              </Button>
            </Section>

            <Section className="my-[32px] text-center">
              <Text className="mb-6 text-sm text-gray-500">
                If the button doesn&apos;t work, copy and paste this link into your browser:
              </Text>

              <Section className="mb-6 overflow-hidden rounded-md bg-gray-50 p-3">
                <Link href={link} className="break-all text-xs text-blue-600">
                  {link}
                </Link>
              </Section>
            </Section>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-center text-xs text-gray-400">
              If you didn&apos;t request this login link, you can safely ignore this email.
            </Text>

            <Text className="mt-4 text-center text-xs text-gray-400">
              For security, this link expires in {expiryMinutes} minutes.
            </Text>

            <Text className="mt-6 text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} {env.APP_NAME}. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
