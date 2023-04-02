import React from 'react';

interface Props {
  background?: string;
  size?: [number, number];
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

// eslint-disable-next-line react/display-name
const PingCircle = React.forwardRef(
  (
    {
      background = 'bg-white',
      size = [5, 5],
      className,
      onClick,
      onMouseEnter,
    }: Props,
    ref: React.ForwardedRef<HTMLSpanElement>
  ) => {
    return (
      <span
        className={`relative flex h-${size[0]} w-${size[0]} ${className}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        ref={ref}
      >
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${background} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-${size[1]} w-${size[1]} ${background} m-auto`}
        ></span>
      </span>
    );
  }
);

export default PingCircle;
