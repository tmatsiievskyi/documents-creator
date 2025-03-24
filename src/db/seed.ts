import { eq } from 'drizzle-orm';
import { database } from './index';
import { companiesTable, TCompaniesInsert } from './schema/companies';
import { documentsTable, TDocumentInsert } from './schema/documents';
import { TUser, TUserInsert, usersTable } from './schema/user';

const companiesToCreate: TCompaniesInsert[] = [
  {
    name: 'Company A',
  },
  {
    name: 'Company B',
  },
];

const seed = async () => {
  try {
    await database.delete(documentsTable);
    await database.delete(usersTable);
    await database.delete(companiesTable);

    const companyIds = await seedCompanies(companiesToCreate);

    const createdUsers = await seedUsers(companyIds);

    await seedDocuments(createdUsers, companyIds);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const seedCompanies = async (newCompanies: TCompaniesInsert[]) => {
  const insertedCompanies = await database
    .insert(companiesTable)
    .values(newCompanies)
    .returning({ id: companiesTable.id });

  return insertedCompanies.map(item => item.id);
};

const seedUsers = async (companyIds: string[]) => {
  const baseUser: TUserInsert[] = [{ email: 'base_user@gmail.com' }];

  const usersForCompanies: TUserInsert[] = companyIds.flatMap((id, index) => {
    return [
      {
        email: `user1_${index}@${id}.com`,
        companyId: id,
        emailVerified: new Date(),
      },
      {
        email: `user2_${index}@${id}.com`,
        companyId: id,
        emailVerified: new Date(),
      },
    ];
  });

  const insertedUsers = await database
    .insert(usersTable)
    .values([...baseUser, ...usersForCompanies])
    .returning();

  return insertedUsers;
};

const seedDocuments = async (inputUsers: TUser[], companyIds: string[]) => {
  const documentsArr: TDocumentInsert[] = [];

  inputUsers.forEach((user, index) => {
    for (let i = 0; i < 2; i++) {
      documentsArr.push({
        status: 'PUBLISHED',
        content: JSON.stringify({
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: `${user.email} document #${index}` }],
            },
          ],
        }),
        ownerType: 'USER',
        ownerUserId: user.id,
        authorId: user.id,
      });
    }
  });

  for (const companyId of companyIds) {
    const companyUsersIds = await database
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.companyId, companyId));

    for (let i = 0; i < 3; i++) {
      const authorId = companyUsersIds[Math.floor(Math.random() * companyUsersIds.length)].id;

      documentsArr.push({
        status: 'PUBLISHED',
        content: JSON.stringify({
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: `Company: #${companyId}. Author: ${companyUsersIds[0].id}` },
              ],
            },
          ],
        }),
        ownerType: 'COMPANY',
        ownerCompanyId: companyId,
        authorId: authorId,
      });
    }
  }

  const insertedDocuments = await database.insert(documentsTable).values(documentsArr).returning();
  console.dir({ insertedDocuments }, { deepth: 3 });
};

seed()
  .catch(console.error)
  .finally(() => {
    process.exit(0);
  });
