import { PrismaClient } from '@prisma/client';

export async function seed(prisma: PrismaClient) {
  await prisma.tag.deleteMany();
  const defaultUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: 'defaultUser@email.com',
    },
  });
  const defaultTags = await prisma.tag.createMany({
    data: [
      {
        name: 'default 1',
        color: 'red',
        createdById: defaultUser.id,
      },
      {
        name: 'default 2',
        color: 'blue',
        createdById: defaultUser.id,
      },
    ],
  });

  return { defaultTags };
}
