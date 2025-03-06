// import { PrismaClient, Prisma } from '@prisma/client'; //TODO: r
// import slugify from 'slugify';

// type TModelNames = keyof typeof Prisma.ModelName;
// type TLowerCaseModelNames = Lowercase<TModelNames>;

// export class SlugGenerator {
//   constructor(private readonly prismaClient: PrismaClient) {}

//   async generateUniqueSlug(
//     title: string,
//     modelName: TLowerCaseModelNames = 'document',
//     maxAttempts: number = 10
//   ) {
//     const baseSlug = this.createBaseSlug(title);
//     let slug = baseSlug;
//     let counter = 0;

//     while ((await this.isSlugExists(slug, modelName)) && counter < maxAttempts) {
//       counter++;
//       slug = `${baseSlug}-${counter}`;
//     }

//     if (counter === maxAttempts) {
//       const randomSuffix = Math.random().toString(36).substring(2, 8);
//       slug = `${baseSlug}-${randomSuffix}`;
//     }

//     return slug;
//   }

//   private createBaseSlug(title: string) {
//     return slugify(title, {
//       replacement: '-',
//       remove: /[*+~.()'"!:@]/g,
//       lower: true,
//       strict: true,
//       locale: 'uk', // TODO: get from i18
//       trim: true,
//     });
//   }

//   private async isSlugExists(slug: string, modelName: TLowerCaseModelNames) {
//     if (modelName === 'document') {
//       const count = await this.prismaClient[modelName].count({
//         where: { slug },
//       });

//       return count > 0;
//     }
//   }
// }
