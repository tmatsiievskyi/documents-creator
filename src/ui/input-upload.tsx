'use client';

import { cn } from '@/lib/utils';
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import { Button } from './button';
import { icons } from './icons';

export type TInputUploadProps = {
  error?: boolean;
  valid?: boolean;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  buttonClassName?: string;
  fieldInfoClassName?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  buttonText?: string;
  onFilesSelected?: (files: File[]) => void;
  disabled?: boolean;
  handleButtonClick: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputUpload = forwardRef<HTMLInputElement, TInputUploadProps>(
  (
    {
      id,
      disabled,
      error,
      valid,
      label,
      labelClassName,
      wrapperClassName,
      buttonClassName,
      fieldInfoClassName,
      accept,
      multiple = false,
      maxSize,
      buttonText = 'Choose file',
      onFilesSelected,
      handleButtonClick,
      handleFileChange,
      ...props
    },
    ref
  ) => {
    const UploadIcon = icons['UploadIcon'];
    return (
      <div className={cn('form-item', wrapperClassName)}>
        {label && (
          <label className={cn('form-label', labelClassName)} htmlFor={id}>
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={disabled}
            variant="default"
            onClick={handleButtonClick}
            className={buttonClassName}
          >
            <UploadIcon className="size-4" />
            {buttonText}
          </Button>
        </div>
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          ref={ref}
          className="hidden"
          {...props}
        />
      </div>
    );
  }
);

InputUpload.displayName = 'InputUpload';
