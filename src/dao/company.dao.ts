import { database } from '@/db';
import { companiesTable, TCompanyInsert, usersTable } from '@/db/export-schema';
import { usersToCompaniesTable } from '@/db/schema/users-to-companies';
import { createDaoLogger, withPerfomanceLogger } from '@/lib/logger/logger';
import { TFullCompanySchema } from '@/lib/zod';
import {
  TCompanyAddress,
  TCompanyWithRelatedUsers,
  TUserToCompanyWithRelated,
} from '@/shared/types';
import { errorHandler, timeUTC } from '@/utils';
import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';

export type TCompanyFilters = {
  search?: string;
  ownedId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'created_at';
  sortDir?: 'asc' | 'desc';
  includeOwner?: boolean;
};

const logger = createDaoLogger('company.dao');

export const getCompaniesDao = async (filters: TCompanyFilters = {}) => {
  const { search, ownedId, limit = 50, offset = 0, sortBy, sortDir, includeOwner } = filters;

  const whereConditions = [];

  if (ownedId) {
    whereConditions.push(eq(companiesTable.ownerId, ownedId));
  }

  if (search) {
    whereConditions.push(
      or(
        ilike(companiesTable.name, `%${search}%`),
        ilike(companiesTable.description, `%${search}%`)
      )
    );
  }

  const sortFn = sortDir === 'asc' ? asc : desc;
  const sortColumn = sortBy === 'created_at' ? companiesTable.created_at : companiesTable.name;

  const companiesQuery = database
    .select()
    .from(companiesTable)
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .orderBy(sortFn(sortColumn))
    .limit(limit)
    .offset(offset);

  const companies = await companiesQuery;

  const countResult = await database
    .select({ count: sql<number>`count(*)` })
    .from(companiesTable)
    .where(whereConditions.length ? and(...whereConditions) : undefined);

  const total = countResult[0]?.count || 0;

  let ownersData: Record<string, unknown> = {};
  if (includeOwner) {
    const ownerIds = [...new Set(companies.map(company => company.ownerId))];

    const ownerRes = await database
      .select({ id: usersTable.id, email: usersTable.email })
      .from(usersTable)
      .where(inArray(usersTable.id, ownerIds));

    ownersData = ownerRes.reduce(
      (acc, owner) => {
        acc[owner.id] = owner;
        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  return {
    companies: companies.map(company => ({
      ...company,
      ...(includeOwner && { owner: ownersData[company.ownerId] }),
    })),
    total,
    limit,
    offset,
  };
};

export type TGetCompanyByIdOptions = {
  includeMembers?: boolean;
  inlcudeOwner?: boolean;
};

export const getCompanyByIdDao = async (
  companyId: string,
  options: TGetCompanyByIdOptions = {}
): Promise<TFullCompanySchema | null> => {
  return await withPerfomanceLogger(
    async () => {
      const { inlcudeOwner = false, includeMembers = false } = options;
      logger.debug({ companyId, includeMembers, inlcudeOwner }, 'DAO. Get Company by ID');

      try {
        if (!includeMembers && !inlcudeOwner) {
          const company = await database.query.companiesTable.findFirst({
            where: eq(companiesTable.id, companyId),
          });

          if (!company) {
            logger.warn({ companyId }, 'Company not found');
            return null;
          }

          const typedCompany = {
            ...company,
            address: company.address as TCompanyAddress | null,
          };

          logger.debug({ companyId }, 'Found company by id without relations');
          return typedCompany;
        }

        const company = (await database.query.companiesTable.findFirst({
          where: eq(companiesTable.id, companyId),
          with: {
            ...(inlcudeOwner
              ? {
                  owner: {},
                }
              : {}),
            ...(includeMembers
              ? {
                  usersToCompaniesTable: {
                    with: {
                      member: {
                        with: {
                          userProfile: true,
                        },
                      },
                    },
                  },
                }
              : {}),
          },
        })) as TCompanyWithRelatedUsers;

        if (!company) {
          logger.warn({ companyId }, 'Company not found');
          return null;
        }

        let members = null;
        if (includeMembers && company.usersToCompaniesTable) {
          members = company.usersToCompaniesTable.map((membership: TUserToCompanyWithRelated) => ({
            // TODO: check this type
            user: membership.member || null,
            role: membership.role,
            acceptedAt: membership.acceptedAt,
          }));
        }

        logger.info({ companyId }, 'Found company by id');
        return {
          ...company,
          address: company.address as TCompanyAddress | null,
          ...(includeMembers ? { members } : null),
          usersToCompaniesTable: undefined,
        };
      } catch (error) {
        logger.error({
          companyId,
          error: errorHandler(error),
          stack: error instanceof Error ? error.stack : undefined,
          table: 'doc_companies',
        });
        return null;
      }
    },
    logger,
    'doc_companies-get-by-id'
  );
};

export const createCompanyDao = async (data: TCompanyInsert) => {
  return await withPerfomanceLogger(
    async () => {
      logger.debug({ companyName: data.name, ownerId: data.ownerId }, 'Creating company');

      try {
        return await database.transaction(async tx => {
          const [company] = await tx.insert(companiesTable).values(data).returning();
          logger.info({ companyId: company.id }, 'Company created');

          await tx.insert(usersToCompaniesTable).values({
            companyId: company.id,
            userId: data.ownerId,
            role: 'ADMIN',
            acceptedAt: timeUTC(),
          });

          return company;
        });
      } catch (error) {
        logger.error({
          error: errorHandler(error),
          stack: error instanceof Error ? error.stack : undefined,
          table: 'doc_companies',
        });
        throw error;
      }
    },
    logger,
    'doc_company-insert'
  );
};

export const updateCompanyDao = async (companyId: string, data: Partial<TCompanyInsert>) => {
  try {
    logger.debug({ companyId }, 'Updating company');
    // eslint-disable-next-line no-unused-vars
    const { ownerId, ...restData } = data;

    const [company] = await database
      .update(companiesTable)
      .set({ ...restData, updated_at: timeUTC() })
      .where(eq(companiesTable.id, companyId))
      .returning();

    logger.info({ companyId }, 'Updated company');
    return company;
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
      table: 'doc_companies',
    });
    throw error;
  }
};

export const deleteCompanyDao = async (companyId: string) => {
  logger.debug({ companyId }, 'DAO. Deleting a company');

  try {
    await database.transaction(async tx => {
      // delete memberships
      await tx.delete(usersToCompaniesTable).where(eq(usersToCompaniesTable.companyId, companyId));

      // delete company
      const [deletedCompany] = await tx
        .delete(companiesTable)
        .where(eq(companiesTable.id, companyId))
        .returning();

      logger.info({ companyId }, 'Company deleted');
      return deletedCompany;
    });
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
      table: 'doc_companies',
    });
    throw error;
  }
};
