import { CSSProperties } from 'react';

import { useDraggable } from '@dnd-kit/core';
import { Draggable } from '@/ui/dnd';
import { icons } from '@/ui';

type TProps = {
  x?: number;
  y?: number;
  cursorType: 'cursorYTop' | 'cursorYBottom' | 'cursorXLeft' | 'cursorXRight';
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
    id: `${cursorType}`,
  });

  const Icon = icons['Play'];
  const cursorY = cursorType === 'cursorYBottom' || cursorType === 'cursorYTop';
  const draggableStyle = cursorY
    ? ({ top: y, right: x, zIndex: 2 } as CSSProperties)
    : ({ bottom: y, left: x, zIndex: 2 } as CSSProperties);
  const cursorPosition = cursorY
    ? 'rotate-0 translate-y-[50%] translate-x-[-30%]'
    : 'rotate-90 translate-y-[20%]';
  const paddingLineStyle = cursorY
    ? 'h-[1px] w-[1000px]  bg-red-200 left-[5px] translate-y-[50%]'
    : 'w-[1px]  bg-red-200 h-[1000px] translate-y-[100%]';

  return (
    <Draggable
      style={{ ...draggableStyle, position: 'absolute' }}
      attributes={attributes}
      isDragging={isDragging}
      listeners={listeners}
      setNodeRef={draggableRef}
      transform={transform}
      customClassName="text-primary" // TODO: update to accent color
    >
      <Icon
        className={`${cursorPosition} absolute bottom-0`}
        size={CURSOR_WIDTH}
        strokeWidth={1}
        fill={'currentColor'} // TODO: update style
      />

      <div // TODO: get height from props. Change color
        className={`absolute bottom-0 z-50 ${paddingLineStyle} transition-all duration-300 ease-in-out
            ${isDragging ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
      />
    </Draggable>
  );
};
