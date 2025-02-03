import { cn } from '@/lib/utils';
import { WithCursor, WIthRulerGrid } from './components';
import { TRulerProps } from './ruler.hoc';

export const Ruler = ({
  cursors,
  spaces,
  wrapperClassName,
  width,
}: TRulerProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {cursors.length &&
        cursors.map(({ type, initialCoordinates }) => (
          <WithCursor
            key={type}
            initialCoordinates={initialCoordinates}
            type={type}
            spaces={spaces}
          />
        ))}
      <WIthRulerGrid spaces={spaces} width={width} />
    </div>
  );
};
