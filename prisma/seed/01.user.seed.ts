import { Crypting } from '@/utils';
import { PrismaClient } from '@prisma/client';

export async function seed(prisma: PrismaClient) {
  await prisma.document.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  const defaultUser = await prisma.user.upsert({
    where: { email: 'defaultUser@email.com' },
    update: {},
    create: {
      email: 'defaultUser@email.com',
      password: await Crypting.hashString('defaultPassword'),
      fullName: 'Default User',
    },
  });

  return { defaultUser };
}
