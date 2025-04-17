import { database } from '@/db';
import {
  accountsTable,
  profilesTable,
  TAccountInsert,
  TProfileInsert,
  TUserInsert,
  usersTable,
} from '@/db/export-schema';
import { createDaoLogger, withPerfomanceLogger } from '@/lib/logger/logger';
import { TFullUser, TUserToCompanyWithRelated } from '@/shared/types';
import { timeUTC } from '@/utils';
import { eq } from 'drizzle-orm';

export type TGetUserOptions = {
  includeProfile?: boolean;
  includeAccount?: boolean;
  includeOwnedCompanies?: boolean;
  includeCompanyMemberships?: boolean;
};

const logger = createDaoLogger('user.dao');

export const getUserByIdDao = async (
  userId: string,
  options: TGetUserOptions = {}
): Promise<TFullUser | null> => {
  return await withPerfomanceLogger(
    async () => {
      logger.debug({ userId, options }, 'Getting user by id');

      try {
        const {
          includeAccount = false,
          includeProfile = false,
          includeOwnedCompanies = false,
          includeCompanyMemberships = false,
        } = options;

        if (
          !includeAccount &&
          !includeProfile &&
          !includeOwnedCompanies &&
          !includeCompanyMemberships
        ) {
          const user = await database.query.usersTable.findFirst({
            where: eq(usersTable.id, userId),
          });

          if (!user) {
            logger.info({ userId }, 'User  by Id not found');

            return null;
          }

          logger.debug({ userId }, 'Found user by Id without relations');
          return { ...user, userProfile: null, userAccounts: null };
        }

        const user = (await database.query.usersTable.findFirst({
          where: eq(usersTable.id, userId),
          with: {
            ...(includeProfile ? { userProfile: true } : {}),
            ...(includeAccount ? { userAccounts: true } : {}),
            ...(includeOwnedCompanies ? { ownedCompanies: true } : {}),
            ...(includeCompanyMemberships ? { member: { with: { company: true } } } : {}),
          },
        })) as TFullUser & { member?: TUserToCompanyWithRelated };

        if (!user) {
          logger.info({ userId }, 'User by Id not found');
          return null;
        }

        let companyMemberships = null;
        if (includeCompanyMemberships && user.member) {
          companyMemberships = user.member.map(membership => ({
            role: membership.role,
            invitedAt: membership.invitedAt,
            acceptedAt: membership.acceptedAt,
            invitedBy: membership.invitedBy,
            company: membership.company,
          }));
        }

        logger.debug(
          {
            userId,
            hasProfile: !!user.userProfile,
            accountsCount: user.userAccounts?.length,
            ownerCompaniesCount: user.ownedCompanies?.length,
            companyMemberships: companyMemberships?.length,
          },
          'Found user by Id with relations'
        );

        return {
          ...user,
          userProfile: user.userProfile || null,
          userAccounts: user.userAccounts || null,
          ownedCompanies: user.ownedCompanies?.length ? user.ownedCompanies : null,
          companyMemberships,
          member: undefined,
        };
      } catch (error) {
        logger.error(
          {
            userId,
            error: error instanceof Error ? error.message : String(error),
          },
          'Error getting user by ID'
        );
        throw error;
      }
    },
    logger,
    'doc_users-get-by-id'
  );
};

export const getUserByEmailDao = async (
  email: string,
  options: TGetUserOptions = {}
): Promise<TFullUser | null> => {
  return await withPerfomanceLogger(
    async () => {
      logger.debug({ email, options }, 'Getting user by email');

      try {
        const {
          includeAccount = false,
          includeProfile = false,
          includeCompanyMemberships = false,
          includeOwnedCompanies = false,
        } = options;

        if (
          !includeAccount &&
          !includeProfile &&
          !includeCompanyMemberships &&
          !includeOwnedCompanies
        ) {
          const user = await database.query.usersTable.findFirst({
            where: eq(usersTable.email, email),
          });

          if (!user) {
            logger.info({ email }, 'User  by email not found');

            return null;
          }

          logger.debug({ email }, 'Found user by email without relations');
          return { ...user, userProfile: null, userAccounts: null };
        }

        const user = (await database.query.usersTable.findFirst({
          where: eq(usersTable.email, email),
          with: {
            ...(includeAccount ? { userAccounts: true } : {}),
            ...(includeProfile ? { userProfile: true } : {}),
            ...(includeOwnedCompanies ? { ownedCompanies: true } : {}),
            ...(includeCompanyMemberships ? { member: { with: { company: true } } } : {}),
          },
        })) as TFullUser & { member: TUserToCompanyWithRelated };

        if (!user) {
          logger.debug({ email }, 'User by email not found');
          return null;
        }

        let companyMemberships = null;
        if (includeCompanyMemberships && user.member) {
          companyMemberships = user.member.map(membership => ({
            role: membership.role,
            invitedAt: membership.invitedAt,
            acceptedAt: membership.acceptedAt,
            inivitedBy: membership.invitedBy,
            company: membership.company,
          }));
        }

        logger.debug(
          {
            email,
            hasProfile: !!user.userProfile,
            accountsCount: user.userAccounts?.length,
            ownerCompaniesCount: user.ownedCompanies?.length,
            companyMembershipsCount: companyMemberships?.length,
          },
          'Found user by Email with relations'
        );

        return {
          ...user,
          userProfile: user.userProfile || null,
          userAccounts: user.userAccounts || null,
          ownedCompanies: user.ownedCompanies?.length ? user.ownedCompanies : null,
          companyMemberships,
          member: undefined,
        };
      } catch (error) {
        logger.error(
          {
            email,
            error: error instanceof Error ? error.message : String(error),
          },
          'Error getting user by Email'
        );

        throw error;
      }
    },
    logger,
    'doc_users-get-by-email'
  );
};

export const createUserDao = async ({
  userData,
  accountData,
  profileData,
}: {
  userData: TUserInsert;
  accountData?: Omit<TAccountInsert, 'userId'>;
  profileData?: Omit<TProfileInsert, 'userId'>;
}) => {
  return await withPerfomanceLogger(
    async () => {
      logger.debug({ email: userData.email }, 'Creating user');
      try {
        const txResult = await database.transaction(async tx => {
          const [user] = await tx.insert(usersTable).values(userData).returning();
          logger.info({ userId: user.id }, 'Created a user');

          let userProfile = null;
          if (profileData) {
            const [newProfile] = await tx
              .insert(profilesTable)
              .values({ ...profileData, userId: user.id })
              .returning();
            userProfile = newProfile;
            logger.info({ userId: user.id, profileId: newProfile.id }, 'Created a profile');
          }

          let userAccounts = null;
          if (accountData) {
            const [newAccount] = await tx
              .insert(accountsTable)
              .values({ ...accountData, userId: user.id })
              .returning();
            userAccounts = newAccount;
            logger.info({ userId: user.id, accountId: newAccount.id }, 'Created a account');
          }

          return {
            ...user,
            userProfile,
            userAccounts,
          };
        });

        return txResult;
      } catch (error) {
        logger.error(
          {
            email: userData.email,
            error: error instanceof Error ? error.message : String(error),
          },
          'Error creating user'
        );
        throw error;
      }
    },
    logger,
    'doc_users-create'
  );
};

export const setEmailVerified = async (userId: string) => {
  logger.debug({ userId }, 'Setting email verified for user by id');

  try {
    await database
      .update(usersTable)
      .set({ emailVerified: timeUTC() })
      .where(eq(usersTable.id, userId));

    logger.info({ userId }, 'Email marked as verified');
  } catch (error) {
    logger.error(
      {
        userId,
        error: error instanceof Error ? error.message : String(error),
      },
      'Error setting email verified'
    );
    throw error;
  }
};

export const updateUserByIdDao = async (
  userId: string,
  updData: {
    userData?: Partial<TUserInsert>;
    profileData?: Partial<TProfileInsert>;
    accountData?: Partial<TAccountInsert>;
  }
) => {
  logger.debug(
    {
      userId,
      hasUserData: !!updData.userData,
      hasProfileData: !!updData.profileData,
      hasAccountData: !!updData.accountData,
    },
    'Updating user data'
  );

  return await withPerfomanceLogger(
    async () => {
      return await database.transaction(async tx => {
        let user = null;
        let account = null;
        let profile = null;

        const { userData, profileData, accountData } = updData;

        if (userData && Object.keys(userData).length > 0) {
          const [updatedUser] = await tx
            .update(usersTable)
            .set(userData)
            .where(eq(usersTable.id, userId))
            .returning();

          user = updatedUser;
          logger.debug({ userId }, 'Updated user record');
        }

        if (profileData && Object.keys(profileData).length > 0) {
          const existingProfile = await tx
            .select()
            .from(profilesTable)
            .where(eq(profilesTable.userId, userId))
            .limit(1);

          if (existingProfile.length > 0) {
            const [updatedProfile] = await tx
              .update(profilesTable)
              .set(profileData)
              .where(eq(profilesTable.userId, userId))
              .returning();
            profile = updatedProfile;
            logger.debug({ userId }, 'Updated existing profile');
          } else {
            const [newProfile] = await tx
              .insert(profilesTable)
              .values({ ...profileData, userId })
              .returning();

            profile = newProfile;
            logger.debug({ userId }, 'Created new profile during update');
          }
        }

        if (accountData && Object.keys(accountData).length > 0) {
          const { accountType, ...restAccountUpdateData } = accountData;

          if (accountType) {
            const existingAccount = await tx
              .select()
              .from(accountsTable)
              .where(eq(accountsTable.userId, userId) && eq(accountsTable.accountType, accountType))
              .limit(1);

            if (existingAccount.length > 0) {
              const [updatedAccount] = await tx
                .update(accountsTable)
                .set(restAccountUpdateData)
                .where(
                  eq(accountsTable.userId, userId) && eq(accountsTable.accountType, accountType)
                )
                .returning();

              account = updatedAccount;
              logger.debug({ userId, accountType }, 'Updated existing account');
            } else {
              const [newAccount] = await tx
                .insert(accountsTable)
                .values({ ...restAccountUpdateData, accountType, userId })
                .returning();

              account = newAccount;
              logger.debug({ userId, accountType }, 'Created new account during update');
            }
          }
        }

        if (!user) {
          const userFromDb = await tx.query.usersTable.findFirst({
            where: eq(usersTable.id, userId),
          });

          user = userFromDb;
        }

        logger.info(
          {
            userId,
            hasUpdatedUser: !!user,
            hasUpdatedProfile: !!profile,
            hasUpdatedAccount: !!account,
          },
          'User updated successfully'
        );

        return {
          user,
          account,
          profile,
        };
      });
    },
    logger,
    'update-user'
  );
};
