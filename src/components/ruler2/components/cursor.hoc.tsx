import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Cursor } from './cursor.container';
import { memo, useCallback, useMemo, useState } from 'react';
import { getModifiers, getPaddingFromCursorCoordinates } from '../utils';
import { TRulerProps } from '../ruler.hoc';
import { useAppEditorActions } from '@/shared/context';

export type TCursorType = 'cursorYTop' | 'cursorYBottom' | 'cursorXLeft' | 'cursorXRight';

export type TCursorProps = {
  cursorType: TCursorType;
  spaces: number;
  coordinates: { x: number; y: number };
};

export const WithCursor = memo(
  ({
    spaces,
    orientation,
    size,
    cursors,
  }: Pick<TRulerProps, 'cursors' | 'spaces' | 'orientation' | 'size'>) => {
    const [items, setItems] = useState<TCursorProps[]>(cursors);
    const { changePadding } = useAppEditorActions();
    const modifiers = useMemo(() => getModifiers({ orientation, spaces }), [orientation, spaces]);

    const updateItemCoordinates = useCallback((event: DragEndEvent) => {
      setItems(prevItems =>
        prevItems.map(item => {
          if (item.cursorType === event.active.id) {
            const coordinates = {
              x: item.coordinates.x + event.delta.x,
              y: item.coordinates.y + event.delta.y,
            };
            return { ...item, coordinates };
          }
          return item;
        })
      );
    }, []);

    const updatePadding = useCallback(
      (cursorType: string, deltaX: number, deltaY: number) => {
        const cursor = items.find(item => item.cursorType === cursorType);

        if (cursor) {
          const newCoordinates = {
            x: cursor.coordinates.x + deltaX,
            y: cursor.coordinates.y + deltaY,
          };

          const paddingValue = getPaddingFromCursorCoordinates(
            cursorType as TCursorType,
            newCoordinates,
            size
          );

          if (paddingValue?.padding && paddingValue?.value !== undefined) {
            changePadding(paddingValue.padding, paddingValue.value);
          }
        }
      },
      [items, changePadding, size]
    );

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        console.log(event);
        updateItemCoordinates(event);
        updatePadding(event.active.id.toString(), event.delta.x, event.delta.y);
      },
      [updateItemCoordinates, updatePadding]
    );

    return (
      <DndContext modifiers={modifiers} onDragEnd={handleDragEnd}>
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
  }
);

WithCursor.displayName = 'WithCursor';
