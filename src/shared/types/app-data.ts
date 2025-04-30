import { TAccount, TCompanies, TProfile, TUser, TUsersToCompanies } from '@/db/export-schema';

export type TUserToCompanyWithRelated = TUsersToCompanies & {
  company?: TCompanies;
  member?: TFullUser;
};

export type TCompanyUserRole = TUsersToCompanies['role'];
export type TFullUser = TUser & {
  userProfile: TProfile | null;
  userAccounts: TAccount[] | null;
  ownedCompanies?: TCompanies[] | null;
  member?: TUserToCompanyWithRelated[];
  companyMemberships?: Array<{
    role: TCompanyUserRole;
    invitedAt?: Date | null;
    acceptedAt?: Date | null;
    invitedBy?: string | null;
    company?: TCompanies;
  }> | null;
};

export type TCompanyWithRelatedUsers = TCompanies & {
  address: TCompanyAddress | null;
  usersToCompaniesTable?: TUserToCompanyWithRelated[];
};

export type TCompanyAddress = {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
};

export type TGoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};
