import { Modifier } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

const cursors = {
  cursorXLeft: (spacesInPx: number) => {
    return [
      restrictToHorizontalAxis,
      (
        (): Modifier =>
        ({ transform, draggingNodeRect, containerNodeRect }) => {
          const value = {
            ...transform,
          };

          if (!draggingNodeRect || !containerNodeRect) {
            return value;
          }

          if (draggingNodeRect?.left + transform.x <= containerNodeRect?.left) {
            //half left
            value.x = containerNodeRect.left - draggingNodeRect.left;
          } else if (
            draggingNodeRect.right + transform.x >=
            containerNodeRect.left +
              containerNodeRect.width / 2 -
              spacesInPx * 2
          ) {
            //half right
            value.x =
              containerNodeRect.left +
              containerNodeRect.width / 2 -
              spacesInPx * 2 -
              draggingNodeRect.right;
          }

          const snappedX = Math.round(value.x / spacesInPx) * spacesInPx;

          return { ...value, x: snappedX };
        }
      )(),
    ];
  },
  cursorXRight: (spacesInPx: number) => {
    return [
      restrictToHorizontalAxis,
      (
        (): Modifier =>
        ({ transform, draggingNodeRect, containerNodeRect }) => {
          const value = {
            ...transform,
          };

          if (!draggingNodeRect || !containerNodeRect) {
            return value;
          }

          if (
            draggingNodeRect.left + transform.x <=
            containerNodeRect.left +
              containerNodeRect.width / 2 +
              spacesInPx * 2
          ) {
            value.x =
              containerNodeRect.left +
              containerNodeRect.width / 2 +
              spacesInPx * 2 -
              draggingNodeRect.left;
          } else if (
            draggingNodeRect.right + transform.x >=
            containerNodeRect.left + containerNodeRect.width
          ) {
            value.x =
              containerNodeRect.left +
              containerNodeRect.width -
              draggingNodeRect.right;
          }

          const snappedX = Math.round(value.x / spacesInPx) * spacesInPx;

          return { ...value, x: snappedX };
        }
      )(),
    ];
  },
} as const satisfies Record<string, (spacesInPx: number) => Modifier[]>;

export type TCursor = keyof typeof cursors;

type TProps = {
  item: TCursor;
  spaces: number;
};

export const getModifiers = ({ item, spaces }: TProps) => {
  return cursors[item](spaces);
};
