'use client';

import { CSSProperties, useMemo, useState } from 'react';
import {
  DndContext,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/utilities';
import { TProps } from './ruler.hoc';
import {
  createSnapModifier,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { Draggable } from '@/ui/dnd';
import { RulerSurface } from './surface.ruler';
import { Triangle } from 'lucide-react';
import { DataUtil, EDimmesionUnits } from '@/utils';
import { RulerCursor } from './cursor.ruler';

const defaultCoordinates = {
  x: 0,
  y: 0,
};

const RULER_SPACES = 0.25;
const CURSOR_WIDTH = 12;

export const Ruler = ({ width }: Pick<TProps, 'width'>) => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);

  const rulerSpacesInPx = useMemo(
    () =>
      DataUtil.convertDimensionToDifUnits(
        RULER_SPACES,
        EDimmesionUnits.cm,
        EDimmesionUnits.px
      ),
    []
  );

  const snapToGridAndRestrictToParent = (args: any) => {
    const { transform, draggingNodeRect, containerNodeRect } = args;

    if (!draggingNodeRect || !containerNodeRect) {
      return transform;
    }

    // Apply restrictToParentElement
    const restricted = restrictToParentElement(args);

    // Snap to grid
    const snappedX =
      Math.round(restricted.x / rulerSpacesInPx) * rulerSpacesInPx;

    return {
      ...restricted,
      x: snappedX,
    };
  };
  // const mouseSensor = useSensor(MouseSensor, {
  //   activationConstraint: {
  //     delay: 5,
  //     tolerance: 5,
  //   },
  // });
  // const touchSensor = useSensor(TouchSensor, {
  //   activationConstraint: {
  //     delay: 5,
  //     tolerance: 5,
  //   },
  // });
  // const sensors = useSensors(mouseSensor, touchSensor);
  const gridItems = useMemo(
    () =>
      DataUtil.generateArrayOfNumbers(
        0,
        parseFloat(width.slice(0, -2)) / 10,
        0.25
      ),
    [width]
  );

  const modifiers = [
    restrictToParentElement,
    restrictToHorizontalAxis,
    snapToGridAndRestrictToParent,
  ];

  return (
    <DndContext
      modifiers={modifiers}
      // sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
    >
      <div className='relative w-full mt-8'>
        <RulerSurface gridItems={gridItems}>
          <RulerCursor
            // modifiers={[
            //   restrictToParentElement,
            //   snapToGrid,
            //   restrictToHorizontalAxis,
            // ]}
            // style={style}
            // key={gridSize}
            // defaultCoordinates={defaultCoordinates}
            x={x}
            y={y}
            cursorWidth={CURSOR_WIDTH}
            rulerId='ruler-horizontal-left'
          />
        </RulerSurface>
      </div>
    </DndContext>
  );
};

// type TRulerCursorProps = {
//   modifiers?: Modifiers;
//   style?: CSSProperties;
//   defaultCoordinates: Coordinates;
//   activationConstraint?: PointerActivationConstraint;
// };

// const RulerCursor = ({
//   modifiers,
//   defaultCoordinates,
//   activationConstraint,
// }: TRulerCursorProps) => {
//   const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);

//   const mouseSensor = useSensor(MouseSensor, {
//     activationConstraint,
//   });
//   const touchSensor = useSensor(TouchSensor, {
//     activationConstraint,
//   });
//   const sensors = useSensors(mouseSensor, touchSensor);

//   return (
//     <DndContext
//       modifiers={modifiers}
//       sensors={sensors}
//       onDragEnd={({ delta }) => {
//         setCoordinates(({ x, y }) => {
//           return {
//             x: x + delta.x,
//             y: y + delta.y,
//           };
//         });
//       }}
//     >
//       <Draggable draggableId='rulerCursor' style={{ top: y, left: x }}>
//         <Triangle className='  rotate-180' size={16} strokeWidth={1} />
//       </Draggable>
//     </DndContext>
//   );
// };
