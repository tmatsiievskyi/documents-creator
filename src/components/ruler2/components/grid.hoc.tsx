import { TRulerProps } from '../ruler.hoc';
import { RulerGrid } from './grid.component';

export type TRulerGridProps = {
  wrapperRulerClassName?: string;
} & Pick<TRulerProps, 'size' | 'spaces' | 'orientation'>;

export const WIthRulerGrid = (props: TRulerGridProps) => (
  <RulerGrid {...props} />
);
