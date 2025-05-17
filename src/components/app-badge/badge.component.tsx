'use client';

import { TCompany, TUsersToCompanies } from '@/db/export-schema';
import { Badge } from '@/ui/badge';
import { useTranslations } from 'next-intl';

export const CompanyStatusBadge = ({ status }: Pick<TCompany, 'status'>) => {
  const t = useTranslations('company');

  switch (status) {
    case 'ACTIVE':
      return <Badge className="bg-green-500">{t('status_active')}</Badge>;
    case 'INACTIVE':
      return <Badge variant="secondary">{t('status_inactive')}</Badge>;
    case 'PENDING_VERIFICATION':
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          {t('status_pending')}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const CompanyEmployeeRoleBadge = ({ role }: Pick<TUsersToCompanies, 'role'>) => {
  const t = useTranslations('company.members');

  switch (role) {
    case 'ADMIN':
      return <Badge variant="default">{t('role.admin')}</Badge>;
    case 'EDITOR':
      return <Badge variant="secondary">{t('role.editor')}</Badge>;
    case 'MANAGER':
      return <Badge variant="outline">{t('role.manager')}</Badge>;
    case 'VIEWER':
      return <Badge variant="outline">{t('role.viewer')}</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};
