import React, { FC } from 'react';
import classNames from 'classnames';

export type FormErrorMessageProps = {
  className?: string;
  children: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p
    className={classNames(
      'font-serif block text-left text-sm text-red-600',
      className
    )}
  >
    {children}
  </p>
);
