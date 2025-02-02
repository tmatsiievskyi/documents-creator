import { WithCursor } from './components';
import { TRulerProps } from './ruler.hoc';

export const Ruler = ({ cursors, spaces }: TRulerProps) => {
  return (
    <>
      {cursors.length &&
        cursors.map(({ type, initialCoordinates }) => (
          <WithCursor
            key={type}
            initialCoordinates={initialCoordinates}
            type={type}
            spaces={spaces}
          />
        ))}
    </>
  );
};
