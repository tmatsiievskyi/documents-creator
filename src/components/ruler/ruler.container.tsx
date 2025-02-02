'use client';

import { CSSProperties, useMemo, useState } from 'react';
import {
  DndContext,
  Modifier,
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
  restric,
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

const defaultCoordinatesXRight = {
  x: 210,
  y: 0,
};

const RULER_SPACES = 0.25;
const CURSOR_WIDTH = 12;

export const Ruler = ({ width }: Pick<TProps, 'width'>) => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
  const [{ xRight, yRight }] = useState<Coordinates>(defaultCoordinatesXRight);

  const rulerSpacesInPx = useMemo(
    () =>
      DataUtil.convertDimensionToDifUnits(
        RULER_SPACES,
        EDimmesionUnits.cm,
        EDimmesionUnits.px
      ),
    []
  );

  const createRestrictionToXAxis =
    (minX: number, maxX: number): Modifier =>
    ({ draggingNodeRect, containerNodeRect, transform }) => {
      // console.log(draggingNodeRect, containerNodeRect);
      // rect - draggingNodeRect
      // boundingRect  - containerNodeRect

      const value = {
        ...transform,
      };

      if (!draggingNodeRect || !containerNodeRect) {
        return value;
      }

      if (draggingNodeRect?.left + transform.x <= containerNodeRect?.left) {
        value.x = containerNodeRect.left - draggingNodeRect.left;
      } else if (
        draggingNodeRect.right + transform.x >=
        containerNodeRect.left + containerNodeRect.width / 2
      ) {
        value.x =
          containerNodeRect.left +
          containerNodeRect.width / 2 -
          draggingNodeRect.right;
      }

      const snappedX = Math.round(value.x / rulerSpacesInPx) * rulerSpacesInPx;

      return { ...value, x: snappedX };
    };

  const snapToGridAndRestrictToParent = (args: any) => {
    const { transform, draggingNodeRect, containerNodeRect } = args;

    if (!draggingNodeRect || !containerNodeRect) {
      return transform;
    }

    const restricted = restrictToParentElement(args);

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
    // restrictToParentElement,
    restrictToHorizontalAxis,
    // snapToGridAndRestrictToParent,
    createRestrictionToXAxis(0, 100),
  ];

  return (
    <DndContext
      modifiers={modifiers}
      // sensors={sensors}
      onDragEnd={(event) => {
        // console.log(event);
        setCoordinates(({ x, y }) => {
          return {
            x: x + event.delta.x,
            y: y + event.delta.y,
          };
        });
      }}
    >
      <div className='relative w-full mt-2 flex'>
        <RulerSurface gridItems={gridItems} customClassName='w-1/2'>
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
            rulerSpacesInPx={rulerSpacesInPx}
          />
        </RulerSurface>
        {/* <RulerSurface gridItems={gridItems} customClassName='w-1/2'>
          <RulerCursor
            // modifiers={[
            //   restrictToParentElement,
            //   snapToGrid,
            //   restrictToHorizontalAxis,
            // ]}
            // style={style}
            // key={gridSize}
            // defaultCoordinates={defaultCoordinates}
            x={xRight}
            y={yRight}
            cursorWidth={CURSOR_WIDTH}
            rulerId='ruler-horizontal-left'
          />
        </RulerSurface> */}
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
