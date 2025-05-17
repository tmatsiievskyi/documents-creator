import { TAccount, TCompany, TProfile, TUser, TUsersToCompanies } from '@/db/export-schema';

export type TUserToCompanyWithRelated = TUsersToCompanies & {
  company?: TCompany;
  member?: TFullUser;
};

export type TCompanyUserRole = TUsersToCompanies['role'];
export type TFullUser = TUser & {
  userProfile: TProfile | null;
  userAccounts: TAccount[] | null;
  ownedCompanies?: TCompany[] | null;
  member?: TUserToCompanyWithRelated[];
  companyMemberships?: Array<{
    role: TCompanyUserRole;
    invitedAt?: Date | null;
    acceptedAt?: Date | null;
    invitedBy?: string | null;
    company?: TCompany;
  }> | null;
};

export type TCompanyWithRelatedUsers = TCompany & {
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
