import { cn } from '@/lib/utils';
import { WithCursor, WIthRulerGrid } from './components';
import { TRulerProps } from './ruler.hoc';

export const Ruler = ({
  cursors,
  spaces,
  wrapperClassName,
  size,
  orientation,
  wrapperRulerClassName,
}: TRulerProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      <WithCursor spaces={spaces} cursors={cursors} orientation={orientation} />
      <WIthRulerGrid
        spaces={spaces}
        size={size}
        orientation={orientation}
        wrapperRulerClassName={wrapperRulerClassName}
      />
    </div>
  );
};
