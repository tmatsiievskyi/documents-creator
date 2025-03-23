import { database } from '@/db';
import {
  accountsTable,
  profilesTable,
  TAccountInsert,
  TProfileInsert,
  TUserInsert,
  usersTable,
} from '@/db/export-schema';
import { eq } from 'drizzle-orm';

type TGetUserOptions = {
  includeProfile?: boolean;
  includeAccount?: boolean;
};

export const getUserByIdDao = async (userId: string, options: TGetUserOptions = {}) => {
  const { includeAccount = false, includeProfile = false } = options;

  if (!includeAccount && !includeProfile) {
    const user = await database.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });

    if (!user) {
      return null;
    }

    return { ...user, userProfile: null, userAccounts: null };
  }

  const user = await database.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
    with: {
      ...(includeProfile ? { userProfile: true } : {}),
      ...(includeAccount ? { userAccounts: true } : {}),
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    userProfile: user.userProfile || null,
    userAccounts: user.userAccounts || null,
  };
};

export const getUserByEmailDao = async (email: string, options: TGetUserOptions = {}) => {
  const { includeAccount = false, includeProfile = false } = options;

  if (!includeAccount && !includeProfile) {
    const user = await database.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) {
      return null;
    }

    return { ...user, userProfile: null, userAccounts: null };
  }

  const user = await database.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    with: {
      ...(includeAccount ? { userAccounts: true } : {}),
      ...(includeProfile ? { userProfile: true } : {}),
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    userAccounts: user.userAccounts || null,
    userProfile: user.userProfile || null,
  };
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
  const txResult = await database.transaction(async tx => {
    const [user] = await tx.insert(usersTable).values(userData).returning();

    let userProfile = null;
    if (profileData) {
      const [newProfile] = await tx
        .insert(profilesTable)
        .values({ ...profileData, userId: user.id })
        .returning();
      userProfile = newProfile;
    }

    let userAccounts = null;
    if (accountData) {
      const [newAccount] = await tx
        .insert(accountsTable)
        .values({ ...accountData, userId: user.id })
        .returning();
      userAccounts = newAccount;
    }

    return {
      ...user,
      userProfile,
      userAccounts,
    };
  });

  return txResult;
};

export const setEmailVerified = async (userId: string) => {
  await database
    .update(usersTable)
    .set({ emailVerified: new Date() })
    .where(eq(usersTable.id, userId));
};

export const updateUserByIdDao = async (
  userId: string,
  updData: {
    userData?: Partial<TUserInsert>;
    profileData?: Partial<TProfileInsert>;
    accountData?: Partial<TAccountInsert>;
  }
) => {
  const txResult = await database.transaction(async tx => {
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
      } else {
        const [newProfile] = await tx
          .insert(profilesTable)
          .values({ ...profileData, userId })
          .returning();

        profile = newProfile;
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
            .where(eq(accountsTable.userId, userId) && eq(accountsTable.accountType, accountType))
            .returning();

          account = updatedAccount;
        } else {
          const [newAccount] = await tx
            .insert(accountsTable)
            .values({ ...restAccountUpdateData, accountType, userId })
            .returning();

          account = newAccount;
        }
      }
    }

    if (!user) {
      const userFromDb = await tx.query.usersTable.findFirst({
        where: eq(usersTable.id, userId),
      });

      user = userFromDb;
    }

    return {
      user,
      account,
      profile,
    };
  });

  return txResult;
};
