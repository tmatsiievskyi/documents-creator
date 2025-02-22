import { Modifier } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToVerticalAxis } from '@dnd-kit/modifiers';

const modifiers = {
  landscape: (spacesInPx: number) => {
    return [
      restrictToHorizontalAxis,
      ((): Modifier => props => {
        const { transform, active, draggingNodeRect, containerNodeRect } = props;
        const { id } = active || {};
        if (id === 'cursorXLeft') {
          const value = {
            ...transform,
          };

          if (!draggingNodeRect || !containerNodeRect) {
            return value;
          }

          if (draggingNodeRect?.left + transform.x <= containerNodeRect?.left) {
            // half left
            value.x = containerNodeRect.left - draggingNodeRect.left;
          } else if (
            draggingNodeRect.right + transform.x >=
            containerNodeRect.left + containerNodeRect.width / 2 - spacesInPx * 2
          ) {
            // half right
            value.x =
              containerNodeRect.left +
              containerNodeRect.width / 2 -
              spacesInPx * 2 -
              draggingNodeRect.right;
          }

          const snappedX = Math.round(value.x / spacesInPx) * spacesInPx;

          return { ...value, x: snappedX };
        }
        if (id === 'cursorXRight') {
          const value = {
            ...transform,
          };

          if (!draggingNodeRect || !containerNodeRect) {
            return value;
          }

          if (
            draggingNodeRect.left + transform.x <=
            containerNodeRect.left + containerNodeRect.width / 2 + spacesInPx * 2
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
            value.x = containerNodeRect.left + containerNodeRect.width - draggingNodeRect.right;
          }

          const snappedX = Math.round(value.x / spacesInPx) * spacesInPx;

          return { ...value, x: snappedX };
        }
        return transform;
      })(),
    ];
  },
  portrait: (spacesInPx: number) => {
    return [
      restrictToVerticalAxis,
      ((): Modifier => props => {
        const { transform, active, draggingNodeRect, containerNodeRect } = props;
        const { id } = active || {};
        if (id === 'cursorYTop') {
          const value = {
            ...transform,
          };

          if (!draggingNodeRect || !containerNodeRect) {
            return value;
          }

          if (draggingNodeRect.top + transform.y <= containerNodeRect.top) {
            // half top
            value.y = containerNodeRect.top - draggingNodeRect.top;
          } else if (
            draggingNodeRect.bottom + transform.y >=
            containerNodeRect.top + containerNodeRect.height / 2 - spacesInPx * 2
          ) {
            // half bottom
            value.y =
              containerNodeRect.top +
              containerNodeRect.height / 2 -
              spacesInPx * 2 -
              draggingNodeRect.bottom;
          }

          const snappedX = Math.round(value.y / spacesInPx) * spacesInPx;

          return { ...value, y: snappedX };
        }
        if (id === 'cursorYBottom') {
          const value = {
            ...transform,
          };

          if (!draggingNodeRect || !containerNodeRect) {
            return value;
          }

          if (
            draggingNodeRect.bottom + transform.y >=
            containerNodeRect.top + containerNodeRect.height
          ) {
            // half bottom
            value.y = containerNodeRect.top + containerNodeRect.height - draggingNodeRect.bottom;
          } else if (
            draggingNodeRect.top + transform.y <=
            containerNodeRect.top + containerNodeRect.height / 2 + spacesInPx * 2
          ) {
            // half top
            value.y =
              containerNodeRect.top +
              containerNodeRect.height / 2 +
              spacesInPx * 2 -
              draggingNodeRect.bottom;
          }

          const snappedX = Math.round(value.y / spacesInPx) * spacesInPx;

          return { ...value, y: snappedX };
        }
        return transform;
      })(),
    ];
  },
} as const satisfies Record<string, (spacesInPx: number) => Modifier[]>;

export type TModifiers = keyof typeof modifiers;

type TProps = {
  orientation: TModifiers;
  spaces: number;
};

export const getModifiers = ({ orientation, spaces }: TProps) => {
  return modifiers[orientation](spaces);
};
