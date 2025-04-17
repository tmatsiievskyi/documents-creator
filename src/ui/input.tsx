import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type TInputProps = {
  error?: boolean;
  valid?: boolean;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  fieldSetClassName?: string;
  fieldSetForValueClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, TInputProps>(
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
      type,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('form-item', wrapperClassName)}>
        {label && (
          <label className={cn('form-label', labelClassName)} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm form-input',
            error && 'form-item-error',
            inputClassName
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
Input.displayName = 'Input';

export { Input };
