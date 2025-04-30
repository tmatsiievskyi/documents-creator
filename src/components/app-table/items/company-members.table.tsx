import { useTranslations } from 'next-intl';
import { AppTable } from '../app-table.component';
import { TTableColumn } from '@/shared/types';
import { TUserWithProfile } from '@/lib/zod/user-with-relations.schema';
import { TableCell, TableRow } from '@/ui';
import { formatUTCtoLocalDateTime, getNestedValue } from '@/utils';
import { ReactNode } from 'react';
import { CompanyEmployeeRoleBadge } from '@/components/app-badge';
import { AvatarComponent } from '@/components/avatar/avatar.component';

type TData = {
  user: TUserWithProfile | null;
  role: string | null;
  acceptedAt: Date | null;
};

type TProps = {
  data?: TData[] | null;
};

export const CompanyMembersTable = ({ data }: TProps) => {
  const t = useTranslations('company.members');

  const membersColumns: TTableColumn<TData>[] = [
    { key: 'user.userProfile.image', title: '', sortable: false },
    { key: 'user.email', title: t('table.headers.email'), sortable: false },
    { key: 'user.userProfile.fullName', title: t('table.headers.fullName'), sortable: false },
    { key: 'role', title: t('table.headers.role'), sortable: false },
    { key: 'acceptedAt', title: t('table.headers.acceptedAt'), sortable: false },
  ] as const;

  const renderTableBody = (data?: TData[] | null, columns?: TTableColumn<TData>[] | null) => {
    return (
      <>
        {data?.map(item => {
          return (
            <TableRow key={item.user?.id} className=" border-bkg-frg/20 border-b border-solid">
              {columns?.map(column => {
                const value = getNestedValue(item, column.key);

                if (column.key === 'user.userProfile.image') {
                  return (
                    <TableCell key={column.key}>
                      <AvatarComponent profile={item.user?.userProfile} />
                    </TableCell>
                  );
                }

                if (column.key === 'role') {
                  return (
                    <TableCell key={column.key}>
                      <CompanyEmployeeRoleBadge role={value} />
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(value, item)
                      : value instanceof Date
                        ? formatUTCtoLocalDateTime(value)
                        : (value as ReactNode)}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </>
    );
  };

  return (
    <AppTable
      columns={membersColumns}
      data={data}
      renderBody={renderTableBody}
      tableHeaderRowCN="p-2 text-3 text-muted-foreground"
      tableRowCN=" text-1"
      tableCellCN="text-primary"
    />
  );
};
