import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode | string;
  rightIconClassName?: string;
  leftIcon?: React.ReactNode | string;
  leftIconClassName?: string;
  rounded?: boolean;
  children: React.ReactNode;
}

const Button = ({
  className,
  onClick,
  rightIcon,
  leftIcon,
  rounded,
  rightIconClassName,
  leftIconClassName,
  children,
}: Props) => {
  const btnClass = `${rounded ? 'rounded-full' : 'rounded'} mr-2 ${
    className ? className : ''
  }`;
  return (
    <button className={btnClass} onClick={onClick}>
      {leftIcon && (
        <span className={`${leftIconClassName ? leftIconClassName : ''} pr-2`}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span
          className={`${rightIconClassName ? rightIconClassName : ''} pl-2`}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
