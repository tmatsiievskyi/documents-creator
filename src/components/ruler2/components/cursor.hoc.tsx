import { DndContext } from '@dnd-kit/core';
import { Cursor } from './cursor.container';
import { useMemo, useState } from 'react';
import { getModifiers } from '../utils';
import { TRulerProps } from '../ruler.hoc';

export type TCursorProps = {
  cursorType: 'cursorYTop' | 'cursorYBottom' | 'cursorXLeft' | 'cursorXRight';
  spaces: number;
  coordinates: { x: number; y: number };
};

export const WithCursor = ({
  spaces,
  orientation,
  cursors,
}: Pick<TRulerProps, 'cursors' | 'spaces' | 'orientation'>) => {
  const [items, setItems] = useState<TCursorProps[]>(cursors);

  const modifiers = useMemo(() => getModifiers({ orientation, spaces }), [orientation, spaces]);

  return (
    <DndContext
      modifiers={modifiers}
      onDragEnd={event => {
        setItems(prevItems =>
          prevItems.map(item => {
            if (item.cursorType === event.active.id) {
              return {
                ...item,
                coordinates: {
                  x: item.coordinates.x + event.delta.x,
                  y: item.coordinates.y + event.delta.y,
                },
              };
            }
            return item;
          })
        );
      }}
    >
      {cursors.map(cursor => {
        const curFromItem = items.find(item => item.cursorType === cursor.cursorType);
        return (
          <Cursor
            key={cursor.cursorType}
            x={curFromItem?.coordinates.x}
            y={curFromItem?.coordinates.y}
            cursorType={cursor.cursorType}
          />
        );
      })}
    </DndContext>
  );
};
