import { cn } from '@/lib/utils';

export type TDividerProps = {
  text: string;
  wrapperClassName?: string;
  textClassName?: string;
  lineClassName?: string;
};

export const Divider = ({
  text,
  wrapperClassName,
  textClassName,
  lineClassName,
}: TDividerProps) => {
  return (
    <div className={cn('my-2 flex w-full items-center', wrapperClassName)}>
      <div className={cn('bg-muted-100/30 h-px grow', lineClassName)}></div>
      <span
        className={cn('text-2 text-muted-foreground text-[14px] px-2 mt-[-3px]', textClassName)}
      >
        {text}
      </span>
      <div className={cn('bg-muted-100/30 h-px grow', lineClassName)}></div>
    </div>
  );
};
