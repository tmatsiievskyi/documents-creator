import { ReactNode } from 'react';

export type TButtonCommonProps = {
  action?: (value?: unknown) => void;
  isActive?: () => boolean;
  icon?: ReactNode;
  tooltip?: string;
} & Record<string, unknown>;

export type TSortDirection = 'asc' | 'desc' | null;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: NonNullable<ObjectType[Key]> extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<NonNullable<ObjectType[Key]>>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TTableColumn<T extends object> = {
  key: NestedKeyOf<T>;
  title: string;
  sortable?: boolean;
  render?: (value: T[keyof T] | null, item: T) => ReactNode;
};

export type TTableProps<T extends object> = {
  data?: T[] | null;
  columns: TTableColumn<T>[] | null;
  onSort?: (key: keyof T | null, direction: TSortDirection) => void;
  renderHeader?: (
    columns: TTableColumn<T>[] | null,
    onSort: (column: TTableColumn<T>) => void
  ) => ReactNode;
  renderBody?: (data: T[] | null | undefined, columns: TTableColumn<T>[] | null) => ReactNode;
  tableCN?: string;
  tableHeaderCN?: string;
  tableHeadCN?: string;
  tableHeaderRowCN?: string;
  tableBodyCN?: string;
  tableRowCN?: string;
  tableCellCN?: string;
};
