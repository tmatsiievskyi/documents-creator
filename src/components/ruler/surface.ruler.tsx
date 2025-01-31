import { useDroppable } from '@dnd-kit/core';
import React, { ReactNode, useCallback, useMemo } from 'react';

type TProps = {
  gridItems: number[];
  children?: ReactNode;
};

export const RulerSurface = ({ gridItems, children }: TProps) => {
  const { setNodeRef } = useDroppable({
    id: 'unique-id',
  });
  const getItemStyle = useCallback((value: number) => {
    switch (true) {
      case value % 1 === 0:
        return (
          <span className='relative w-full h-full'>
            <span
              style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '1px',
                height: '5px',
                backgroundColor: 'red',
              }}
            ></span>
            <span
              style={{
                left: `${value >= 10 ? '-5px' : '-3px'}`,
                top: '-22px',
                position: 'absolute',
              }}
            >
              {value}
            </span>
          </span>
        );
      case value % 0.5 === 0:
        return (
          <span className='relative w-full h-full'>
            <span
              style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '1px',
                height: '8px',
                backgroundColor: 'black',
              }}
            ></span>
          </span>
        );

      case value % 0.25 === 0:
        return (
          <span className='relative w-full h-full'>
            <span
              style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '1px',
                height: '3px',
                backgroundColor: 'black',
              }}
            ></span>
          </span>
        );

      default:
        return null;
    }
  }, []);

  return (
    <div className=' absolute bottom-0 left-0 w-full h-6 ' ref={setNodeRef}>
      <div className='relative w-full h-full'>
        {children}

        {gridItems.map((item) => {
          return (
            <span
              key={item}
              className={`text-[10px] absolute bottom-0`}
              style={{ left: `${item}cm` }}
            >
              {getItemStyle(item)}
            </span>
          );
        })}
      </div>
    </div>
  );
};
