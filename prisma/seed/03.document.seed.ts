import { SlugGenerator } from '@/utils/slug.util';
import { PrismaClient } from '@prisma/client';

function generateTiptapContent(title: string) {
  return {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: title }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Базовий текст',
          },
        ],
      },
    ],
  };
}

export async function seed(prisma: PrismaClient) {
  await prisma.document.deleteMany();
  const slugGenerator = new SlugGenerator(prisma);

  const defaultUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: 'defaultUser@email.com',
    },
  });

  const defaultTags = await prisma.tag.findMany({ where: { createdById: defaultUser.id } });

  const defaultDocuments = await prisma.document.create({
    data: {
      title: 'Документ один',
      slug: await slugGenerator.generateUniqueSlug('Документ один'),
      content: generateTiptapContent('Документ один'),
      authorId: defaultUser.id,
      status: 'DRAFT',
      visibility: 'PRIVATE',
      tags: {
        connect: defaultTags.map(item => ({ id: item.id })),
      },
    },
  });

  return { defaultDocuments };
}
