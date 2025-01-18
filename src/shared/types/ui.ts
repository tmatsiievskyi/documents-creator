import { ReactNode } from 'react';

export type TButtonCommonProps = {
  action?: (value?: unknown) => void;
  isActive?: () => boolean;
  icon?: ReactNode;
  tooltip?: string;
} & Record<string, unknown>;
