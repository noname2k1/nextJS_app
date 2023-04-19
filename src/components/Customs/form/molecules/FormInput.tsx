import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, InputProps } from '../atoms/Input';
import { FormErrorMessage } from '../atoms/FormErrorMessage';

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames('', className)} aria-live='polite'>
      <Input
        id={id}
        label={label}
        name={name}
        aria-invalid={hasError}
        className={classNames({
          'border-red-600 transition-colors focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 hover:border-red-600':
            hasError,
        })}
        {...props}
        {...(register && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
