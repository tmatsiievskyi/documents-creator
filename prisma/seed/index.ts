import { PrismaClient } from '@prisma/client';
import { join } from 'node:path';
import { promises as fsp } from 'node:fs';

const prisma = new PrismaClient();

async function seed() {
  const path = join(process.cwd(), '/prisma/seed');

  const seedFiles = (await fsp.readdir(path)).filter(item => item.endsWith('.seed.ts'));

  for (const file of seedFiles) {
    try {
      const seedModule = await import(join(path, file));

      const result = await seedModule.seed(prisma);

      console.log(`seed result for file ${file}:`, result);
    } catch (error) {
      console.log(error);
    }
  }

  // const resp = await Promise.all(
  //   seedFiles.map(async file => {
  //     const data = await (await import(join(path, file))).seed(prisma);

  //     return data;
  //   })
  // );
}

seed()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
