import React from 'react';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Draggable } from '@/ui/dnd';
import { icons } from '@/ui';
import { TCursor } from '../utils';

type TProps = {
  x: number;
  y: number;
  cursorType: TCursor;
};

const CURSOR_WIDTH = 12;

export const Cursor = ({ x, y, cursorType }: TProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `${cursorType}-drag`,
  });
  const { setNodeRef: wrapperRef } = useDroppable({
    id: `${cursorType}-drop`,
  });
  const Icon = icons['Play'];

  return (
    <div ref={wrapperRef} className='relative z-30'>
      <Draggable
        style={{ top: y, left: x }}
        customButtonClassName='z-20 w-[20px]'
        attributes={attributes}
        isDragging={isDragging}
        listeners={listeners}
        setNodeRef={draggableRef}
        transform={transform}
      >
        <Icon
          className='rotate-90 absolute bottom-0'
          size={CURSOR_WIDTH}
          strokeWidth={1}
          fill={'black'} // TODO: update style
        />
        <div //TODO: get height from redux store. Change color
          className={`z-50 w-[1px] bg-red-200 h-a4 absolute bottom-0 left-[0.5px] translate-x-[-50%] translate-y-[100%] transition-all duration-300 ease-in-out ${
            isDragging
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        />
      </Draggable>
    </div>
  );
};
