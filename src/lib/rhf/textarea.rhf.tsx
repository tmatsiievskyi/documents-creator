'use client';

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
import { Textarea } from '@/ui/textarea';

export type TTextareaProps = ComponentProps<typeof Textarea>;

type TProps<T extends FieldValues> = {
  errorMessageClassName?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  name: Path<T>;
} & TTextareaProps;

export const RHFTextarea = <T extends Record<string, unknown>>({
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
          <Textarea error={!!error} {...field} {...props} />
          {error && (
            <RHFErrorMessage className={errorMessageClassName}>{error.message}</RHFErrorMessage>
          )}
        </div>
      )}
    />
  );
};
