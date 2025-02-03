import { DndContext } from '@dnd-kit/core';
import { Cursor } from './cursor.container';
import { useMemo, useState } from 'react';
import { Coordinates } from '@dnd-kit/utilities';
import { getModifiers, TCursor } from '../utils';

export type TCursorProps = {
  type: TCursor;
  initialCoordinates: Coordinates;
  spaces: number;
};

export const WithCursor = ({
  initialCoordinates,
  type,
  spaces,
}: TCursorProps) => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(initialCoordinates);

  const modifiers = useMemo(
    () => getModifiers({ item: type, spaces }),
    [type, spaces]
  );

  return (
    <DndContext
      modifiers={modifiers}
      onDragEnd={(event) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + event.delta.x,
            y: y + event.delta.y,
          };
        });
      }}
    >
      <Cursor x={x} y={y} cursorType={type} />
    </DndContext>
  );
};
