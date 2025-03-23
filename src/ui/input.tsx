import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

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
      <div className={cn('form-item', error && 'form-item-error', wrapperClassName)}>
        {label && (
          <label className={cn('form-label', labelClassName)} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={cn('form-input', inputClassName)}
          id={id}
          onChange={onChange}
          type={type}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
