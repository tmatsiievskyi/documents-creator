import { ReactNode, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  TIconKeys,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  icons,
} from '@/ui';

import { cn } from '@/lib/utils';
import { TooltipContentProps } from '@radix-ui/react-tooltip';
import { TButtonCommonProps } from '@/shared/types';

type TButtonProps = {
  icon: TIconKeys;
  title: string;
  tooltip: string;
  tooltipOptions: TooltipContentProps;
  disabled: boolean;
  shortcutKeys?: string[];
  customClass: string;
  loading: boolean;
  color: string;
  action: TButtonCommonProps['action'];
  isActive: TButtonCommonProps['isActive'];
  children: ReactNode;
  asChild: boolean;
  upload: boolean;
};

const ActionButton = forwardRef<HTMLButtonElement, Partial<TButtonProps>>(
  (props, ref) => {
    const {
      icon,
      asChild,
      customClass,
      action,
      children,
      tooltip,
      tooltipOptions,
      isActive,
      shortcutKeys,
      ...restProps
    } = props;

    const Icon = icon ? icons[icon] : null;
    const Comp = asChild ? Slot : Toggle;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            ref={ref}
            size='sm'
            className={cn('w-[32px] h-[32px]', customClass)}
            onClick={action}
            data-state={isActive?.() ? 'on' : 'off'}
            {...restProps}
          >
            {Icon && <Icon className='w-4 h-4' />}
            {children}
          </Comp>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent {...tooltipOptions}>
            <div className='flex flex-col justify-center items-center text-center max-w-12'>
              <span>{tooltip}</span>
              {!!shortcutKeys?.length && (
                <span>[{shortcutKeys.join('+')}]</span>
              )}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }
);
ActionButton.displayName = 'ActionButton';

export { ActionButton };
