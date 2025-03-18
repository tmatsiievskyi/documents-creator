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
  console.log('Seeding data...');

  try {
    await database.delete(documentsTable);
    await database.delete(usersTable);
    await database.delete(companiesTable);

    console.log('Seeding companies');
    const companyIds = await seedCompanies(companiesToCreate);

    console.log('Seeding users');
    const createdUsers = await seedUsers(companyIds);

    console.log('Seeding documents');
    await seedDocuments(createdUsers, companyIds);

    console.log('✅ Seeding completed successfully. ✅');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
};

const seedCompanies = async (newCompanies: TCompaniesInsert[]) => {
  const insertedCompanies = await database
    .insert(companiesTable)
    .values(newCompanies)
    .returning({ id: companiesTable.id });

  console.log(`Inserted companies: ${insertedCompanies}`);

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

  console.log(`Inserted users: ${insertedUsers}`);

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
    console.log(companyId);
    const companyUsersIds = await database
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.companyId, companyId));

    console.log(companyUsersIds);

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
  console.log(`Inserted documents: ${insertedDocuments}`);
};

seed()
  .catch(console.error)
  .finally(() => {
    process.exit(0);
  });
