import { database } from '@/db';
import { verifyEmailTable } from '@/db/export-schema';
import { env } from '@/lib/env';
import { eq } from 'drizzle-orm';

export const upsertVerifyEmailToken = async (userId: string) => {
  const token = crypto.randomUUID();
  const tokenExpiresAt = new Date(Date.now() + Number(env.NEXT_PUBLIC_VERIFY_EMAIL_TOKEN));

  await database
    .insert(verifyEmailTable)
    .values({ userId, token, tokenExpiresAt })
    .onConflictDoUpdate({
      target: verifyEmailTable.id,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
};

export const getVerifyEmailTokenDao = async (token: string) => {
  const existingToken = await database.query.verifyEmailTable.findFirst({
    where: eq(verifyEmailTable.token, token),
  });

  return existingToken;
};
