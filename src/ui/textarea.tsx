import * as React from 'react';

import { cn } from '@/lib/utils';

export type TTextAreaProps = {
  error?: boolean;
  valid?: boolean;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  fieldSetClassName?: string;
  fieldSetForValueClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TTextAreaProps>(
  (
    {
      id,
      disabled,
      error,
      valid,
      label,
      className,
      inputClassName,
      labelClassName,
      wrapperClassName,
      fieldSetClassName,
      fieldSetForValueClassName,

      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('form-item', error && 'form-item-error', wrapperClassName)}>
        {label && (
          <label className={cn('form-label', labelClassName)} htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm form-input',
            className
          )}
          id={id}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
