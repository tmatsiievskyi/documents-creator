import { Resend } from 'resend';
import { env } from './env';
import { ReactNode } from 'react';

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);

export const sendEmail = async (emailTo: string, subject: string, body: ReactNode) => {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: emailTo,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
};
