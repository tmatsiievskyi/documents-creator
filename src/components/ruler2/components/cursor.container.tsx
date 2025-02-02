import React from 'react';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Draggable } from '@/ui/dnd';
import { icons } from '@/ui';

type TProps = {
  x: number;
  y: number;
};

export const Cursor = ({ x, y }: TProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: 'unique-id',
  });
  const { setNodeRef: wrapperRef } = useDroppable({
    id: 'unique-id',
  });
  const Icon = icons['Play'];

  return (
    <div ref={wrapperRef}>
      <Draggable
        style={{ top: y, left: x }}
        customButtonClassName='z-10'
        attributes={attributes}
        isDragging={isDragging}
        listeners={listeners}
        setNodeRef={draggableRef}
        transform={transform}
      >
        <Icon className='rotate-90 absolute bottom-0 left-[0.5px] translate-x-[-50%]' />
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
