import { ReactNode } from 'react';
import { useDroppable, UniqueIdentifier } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

type TProps = {
  id: UniqueIdentifier;
  children: ReactNode;
  dragging: boolean;
  customClassName?: string;
};

export const Droppable = ({ id, children, customClassName }: TProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={cn('', customClassName)}>
      {children}
    </div>
  );
};
