// 'use client';
import { Draggable } from '@/ui/dnd';
import { DataUtil, EDimmesionUnits } from '@/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Triangle, Play } from 'lucide-react';

type TRulerCursorProps = {
  y: number;
  x: number;
  cursorWidth: number;
  rulerId: string;
};

export const RulerCursor = ({
  y,
  x,
  cursorWidth,
  rulerId,
}: TRulerCursorProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: rulerId,
    });
  const { setNodeRef: droppableRef } = useDroppable({
    id: 'unique-id', //TODO: should be unique
  });

  const heightOfLine = Math.round(
    DataUtil.convertDimensionToDifUnits(
      297,
      EDimmesionUnits.mm,
      EDimmesionUnits.px
    )
  ); //TODO: should be removed and take from redux

  return (
    <div ref={droppableRef} className='w-full'>
      <Draggable
        draggableId='rulerCursor'
        style={{ top: y, left: x }}
        customClassName={` z-10 `}
        attributes={attributes}
        isDragging={isDragging}
        listeners={listeners}
        setNodeRef={setNodeRef}
        transform={transform}
      >
        <div className='h-6 w-[1px] relative'>
          <Play
            className='rotate-90 absolute bottom-0 left-[0.5px] translate-x-[-50%]'
            size={cursorWidth}
            strokeWidth={1}
            fill={'black'}
          />

          <div //TODO: get height from redux store. Change color
            className={`z-50 w-[1px] bg-red-200 absolute bottom-0 left-[0.5px] translate-x-[-50%] translate-y-[100%] transition-all duration-300 ease-in-out ${
              isDragging
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
            style={{ height: `${heightOfLine}px` }}
          />
        </div>
      </Draggable>
    </div>
  );
};
