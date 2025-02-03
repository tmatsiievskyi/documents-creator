import { RulerGrid } from './grid.component';

export type TRulerGridProps = {
  width: number;
  spaces: number;
};

export const WIthRulerGrid = (props: TRulerGridProps) => (
  <RulerGrid {...props} />
);
