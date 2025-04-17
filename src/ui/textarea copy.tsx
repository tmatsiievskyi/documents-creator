import * as React from 'react';

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
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TInputProps>(
  ({ className, error, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn('form-item', error && 'form-item-error', wrapperClassName)}>
        <textarea className={cn('', className)} ref={ref} {...props} />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
