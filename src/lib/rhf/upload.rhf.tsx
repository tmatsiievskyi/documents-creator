'use client';

import { Input, InputUpload } from '@/ui';
import { ChangeEvent, ComponentProps, useRef } from 'react';
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';
import { RHFErrorMessage } from './errorMessage.rhf';

export type TUploadInputProps = Omit<ComponentProps<typeof Input>, 'type'> & {
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
  onFileSelect?: (files: File[]) => void;
  disabled?: boolean;
};

export type TUploadRHFProps<T extends FieldValues> = {
  errorMessageClassName?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  name: Path<T>;
} & TUploadInputProps;

export const RHFUpload = <T extends Record<string, unknown>>({
  errorMessageClassName,
  name,
  onFileSelect,
  multiple,
  ...props
}: TUploadRHFProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restInputProps }, fieldState: { error } }) => {
        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;

          if (!files || files.length === 0) return;

          const filesArray = Array.from(files);

          onChange(multiple ? filesArray : filesArray[0]);

          if (onFileSelect) {
            onFileSelect(filesArray);
          }
        };

        return (
          <div className="relative">
            <InputUpload
              {...props}
              {...restInputProps}
              error={!!error}
              ref={inputRef}
              handleButtonClick={handleButtonClick}
              handleFileChange={handleFileChange}
            />
            {error && (
              <RHFErrorMessage className={errorMessageClassName}>{error.message}</RHFErrorMessage>
            )}
          </div>
        );
      }}
    />
  );
};
