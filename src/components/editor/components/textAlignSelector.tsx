import { ActionButton } from '@/components/buttons';
import { cn } from '@/lib/utils';
import { TButtonCommonProps } from '@/shared/types';
import {
  icons,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TIconKeys,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';
import { Editor } from '@tiptap/core';
import { CSSProperties } from 'react';

type TItem = {
  title: string;
  icon?: TIconKeys;
  isActive: NonNullable<TButtonCommonProps['isActive']>;
  action?: TButtonCommonProps['action'];
  style?: CSSProperties;
  customClassName?: string;
};

type TProps = {
  editor: Editor;
  items: TItem[];
  disabled?: boolean;
  tooltip?: string;
  icon?: TIconKeys;
  customClassName?: string;
};

export const TextAlignSelector = ({
  disabled,
  customClassName,
  icon,
  tooltip,
  items,
}: TProps) => {
  const active = items?.find((item: TItem) => item.isActive() === true);

  return (
    <Popover modal>
      <PopoverTrigger disabled={disabled} asChild>
        <ActionButton
          customClass={cn('', customClassName)}
          icon={active ? active.icon : icon}
          disabled={disabled}
          tooltip={tooltip}
        ></ActionButton>
      </PopoverTrigger>

      <PopoverContent
        className=' min-w-4 w-full p-1 flex flex-row gap-1'
        align='start'
        side='bottom'
      >
        {items.map((item) => {
          const { title, action, customClassName, icon } = item;
          const IconComp = icon ? icons[icon] : null;
          return (
            <Tooltip key={title}>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  onClick={action}
                  className={cn('p-1 w-7 h-7', customClassName)}
                  pressed={active?.title === item.title}
                  data-state={active?.title === item.title ? 'on' : 'off'}
                >
                  {IconComp && <IconComp />}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent className='flex flex-col items-center'>
                <span>{title}</span>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
