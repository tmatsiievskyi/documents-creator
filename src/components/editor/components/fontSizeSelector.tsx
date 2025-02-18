import { ActionButton } from '@/components/buttons';
import { TButtonCommonProps } from '@/shared/types';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui';
import { CSSProperties, useMemo } from 'react';
import { Editor } from '@tiptap/core';

type TItem = {
  title: string;
  isActive: NonNullable<TButtonCommonProps['isActive']>;
  action: TButtonCommonProps['action'];
  style: CSSProperties;
};

type TProps = {
  editor: Editor;
  items: TItem[];
  disabled?: boolean;
  tooltip?: string;
  defaultFontSize: string;
};

const findActive = (items: TItem[], defaultFontSize: string) => {
  const find = items.find((item) => item.isActive());

  if (find) return find;

  return {
    title: defaultFontSize,
    value: defaultFontSize + 'px',
    isActive: () => false,
  };
};

export const FontSizeSelector = ({
  items,
  disabled,
  tooltip,
  defaultFontSize,
}: TProps) => {
  const selectedFontSize = useMemo(
    () => findActive(items, defaultFontSize),
    [defaultFontSize, items]
  );

  return (
    <div className='flex justify-center items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ActionButton
            tooltip={tooltip}
            disabled={disabled}
            customClass='mx-1 my-0'
          >
            <span className='min-w-[36px] border  rounded-md px-1 py-2 leading-[16px] text-base text-center'>
              {selectedFontSize.title}
            </span>
          </ActionButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='min-w-[36px] p-0 text-center'>
          {items?.map((item) => {
            const { title, action } = item;
            return (
              <DropdownMenuCheckboxItem
                key={title}
                onClick={action}
                className='px-0'
              >
                <span className='text-center w-full'>{item.title}</span>
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
