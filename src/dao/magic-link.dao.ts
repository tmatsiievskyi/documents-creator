import { database } from '@/db';
import { magicLinksTable } from '@/db/export-schema';
import { env } from '@/lib/env';
import { eq } from 'drizzle-orm';

export const upsertMagicLink = async (email: string) => {
  const token = crypto.randomUUID();
  const tokenExpiresAt = new Date(Date.now() + Number(env.NEXT_PUBLIC_MAGIC_LINK_EXPIRES!));

  await database
    .insert(magicLinksTable)
    .values({
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinksTable.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
};

export const getMagicLinkByToken = async (token: string) => {
  const magicLink = await database.query.magicLinksTable.findFirst({
    where: eq(magicLinksTable.token, token),
  });

  return magicLink;
};

export const deleteMagicLinkByToken = async (token: string) => {
  await database.delete(magicLinksTable).where(eq(magicLinksTable.token, token));
};
