import { cn } from '@/lib/utils';
import { TTableProps } from '@/shared/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui';
import { formatUTCtoLocalDateTime, getNestedValue } from '@/utils';
import { ReactNode } from 'react';

export const AppTable = <T extends object>({
  data,
  columns,
  onSort,
  renderHeader,
  renderBody,
  tableCN,
  tableHeaderCN,
  tableHeaderRowCN,
  tableBodyCN,
  tableRowCN,
  tableCellCN,
}: TTableProps<T>) => {
  const defaultRenderHeader = () => {
    return (
      <TableRow className={tableRowCN}>
        <>
          {columns?.map(column => {
            return (
              <TableHead className={cn(tableHeaderRowCN)} key={column.key.toString()}>
                <span>{column.title}</span>
              </TableHead>
            );
          })}
        </>
      </TableRow>
    );
  };

  const defaultRenderBody = () => {
    return (
      <>
        {data && Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => {
            return (
              <TableRow className={cn(tableRowCN)} key={index}>
                {columns?.map(column => {
                  const value = getNestedValue(item, column.key);
                  return (
                    <TableCell className={cn(tableCellCN)} key={column.key.toString()}>
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
          })
        ) : (
          <TableRow className={cn(tableRowCN)}>
            <TableCell className={cn('p-2 text-center', tableCellCN)} colSpan={columns?.length}>
              No data available
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };

  const handleSort = () => {};

  return (
    <div className="overflow-x-auto">
      <Table className={tableCN}>
        <TableHeader>
          {renderHeader ? renderHeader(columns, handleSort) : defaultRenderHeader()}
        </TableHeader>
        <TableBody className={tableBodyCN}>
          {renderBody ? renderBody(data, columns) : defaultRenderBody()}
        </TableBody>
      </Table>
    </div>
  );
};
