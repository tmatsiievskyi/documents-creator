import { DraggableAttributes } from '@dnd-kit/core';
import React, { ReactNode, CSSProperties } from 'react';

import styles from './draggable.module.css';
import { cn } from '@/lib/utils';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Transform } from '@dnd-kit/utilities';

enum EAxis {
  All,
  Vertical,
  Horizontal,
}

type TProps = {
  axis?: EAxis;
  dragOverlay?: boolean;
  handle?: boolean;
  isPendingDelay?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  customClassName?: string;
  attributes: DraggableAttributes;
  isDragging?: boolean;
  listeners?: SyntheticListenerMap;
  setNodeRef: (element: HTMLElement | null) => void;
  transform: Transform | null;
};

export const Draggable = ({
  children,
  dragOverlay,
  handle,
  isPendingDelay,
  style,
  customClassName,
  attributes,
  isDragging,
  listeners,
  setNodeRef,
  transform,
  ...props
}: TProps) => {
  return (
    <button
      ref={setNodeRef}
      className={cn(
        customClassName,
        styles.Draggable,
        dragOverlay && styles.dragOverlay,
        isDragging && styles.dragging,
        handle && styles.handle,
        isPendingDelay && styles.pendingDelay
      )}
      style={
        {
          ...style,
          '--translate-x': `${transform?.x ?? 0}px`,
          '--translate-y': `${transform?.y ?? 0}px`,
        } as React.CSSProperties
      }
      {...attributes}
      {...(handle ? {} : listeners)}
      {...props}
    >
      {children}
    </button>
  );
};
