/* eslint-disable react/display-name */
import React, {
  FC,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ComponentProps,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email' | 'file';

export type InputProps = {
  [rest: string]: any;
  id: string;
  name: string;
  label: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  placeholder?: string;
};

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: 'p-3 text-base',
  large: 'p-4 text-base',
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      size = 'medium',
      className = '',
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={classNames([
          'relative inline-flex w-full rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30 hover:border-blue-400',
          sizeMap[size],
          className,
        ])}
        {...props}
      />
    );
  }
);
