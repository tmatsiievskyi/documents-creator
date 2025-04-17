'use client';

import { TCompanies } from '@/db/export-schema';
import { Badge } from '@/ui/badge';
import { useTranslations } from 'next-intl';

export const CompanyStatusBadge = ({ status }: Pick<TCompanies, 'status'>) => {
  const t = useTranslations('company');

  switch (status) {
    case 'ACTIVE':
      return <Badge className="bg-green-500">{t('status_active')}</Badge>;
    case 'INACTIVE':
      return <Badge variant="secondary">Inactive</Badge>;
    case 'PENDING_VERIFICATION':
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Pending Verification
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
