'use client';

import { Input } from '@/ui';
import { ComponentProps } from 'react';
import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
  useFormContext,
  Controller,
} from 'react-hook-form';
import { RHFErrorMessage } from './errorMessage.rhf';

export type TInputProps = ComponentProps<typeof Input>;

export type TProps<T extends FieldValues> = {
  errorMessageClassName?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  name: Path<T>;
} & TInputProps;

export const RHFInput = <T extends Record<string, unknown>>({
  errorMessageClassName,
  name,
  ...props
}: TProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <Input error={!!error} {...field} {...props} />
          {error && (
            <RHFErrorMessage className={errorMessageClassName}>{error.message}</RHFErrorMessage>
          )}
        </div>
      )}
    />
  );
};
