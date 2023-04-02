import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '../hooks';
const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false, // needed to prevent warning about dynamic component
});
interface Props {
  number: number;
}

const Counter = ({ number }: Props) => {
  const matches = useMediaQuery('(max-width: 768px)');
  return (
    <div className='flex items-center font-MSB-light text-4xl font-thin text-black opacity-40 dark:text-white max-md:text-[2vw]'>
      <AnimatedNumbers
        animateToNumber={number}
        fontStyle={{ fontSize: matches ? '5vw' : 32 }}
        configs={(number, index) => {
          return { mass: 1, tension: 500 * (index + 1), friction: 100 };
        }}
      ></AnimatedNumbers>
    </div>
  );
};

export default memo(Counter);
