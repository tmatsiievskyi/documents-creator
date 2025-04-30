import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui';
import { Skeleton } from '@/ui/skeleton';

export const CompanyMembersTableFallback = () => {
  const headerItems = new Array(5).fill(null);
  const bodyItems = new Array(3).fill(null);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <>
              {headerItems.map((_item, index) => (
                <TableHead key={index}>
                  <span>{index !== 0 && <Skeleton className="h-4 w-20" />}</span>
                </TableHead>
              ))}
            </>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bodyItems.map((_item, index) => (
            <TableRow key={index} className="p-2">
              {headerItems.map((_item, index) => {
                return (
                  <TableCell key={index}>
                    <Skeleton className={` ${index === 0 ? 'size-8' : 'h-4 w-32 '}`} />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
