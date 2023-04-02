import React, { useState } from 'react';
import { ArrowIcon } from './Icons';
import { beans } from '@/datas/beansData';
import Image from 'next/image';
import { appConstants } from '@/config/constants';

interface Props {
  data: beans[];
}

const HorizontalSlideShow = ({ data }: Props) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const currentItem = data[currentIndex];

  const handleSetCurrentIndex = (index: number) => {
    if (index < 0 || index > data.length - 1) return;
    setcurrentIndex(index);
  };

  const controlBtnClass =
    'scale-90 hover:scale-100 duration-200 absolute top-1/2 -translate-y-1/2 cursor-pointer text-white';
  return (
    <section
      className={`${currentItem.background} ${
        currentItem.customClassName ? currentItem.customClassName : ''
      } relative z-20 flex h-[70%] w-full -translate-y-8 select-none items-center rounded-xl duration-200`}
    >
      <Image
        alt={appConstants.alt}
        src={'/images/bsticker.png'}
        width={240}
        height={240}
        className='absolute -top-10 -right-10 rotate-[30deg]'
      />
      <div
        className={`${
          currentIndex === 0 ? 'hidden' : ''
        } ${controlBtnClass} -left-14`}
        onClick={() => handleSetCurrentIndex(currentIndex - 1)}
      >
        <ArrowIcon />
      </div>
      <div
        className={`${
          currentIndex === data.length - 1 ? 'hidden' : ''
        } ${controlBtnClass} -right-14 rotate-180`}
        onClick={() => handleSetCurrentIndex(currentIndex + 1)}
      >
        <ArrowIcon />
      </div>
      {/* content */}
      <Image
        src={currentItem.avatar}
        width={1000}
        height={1000}
        alt={appConstants.alt}
        className='m-8 h-3/4 w-2/4 object-contain'
      />
      <div
        className={`${
          currentItem.textColorBlack ? 'text-black' : 'text-white'
        } flex flex-col pr-20`}
      >
        <h1 className='mb-3 font-KFA text-5xl font-black uppercase'>
          {currentItem.name}
        </h1>
        <p className='relative rounded-md bg-white bg-opacity-10 py-4 px-8 font-MSB-regular text-xs font-medium leading-5'>
          <Image
            alt={appConstants.alt}
            src={currentItem.beanType.path}
            width={80}
            height={80}
            className='absolute -left-10 top-1/2 -translate-y-1/2'
          />
          {currentItem.beanType.description}
        </p>
        <p className='mt-6 font-mono-light text-sm font-semibold'>
          {currentItem.description}
        </p>
        <div className='grid grid-flow-row grid-cols-3 gap-3 py-6 font-mono-light font-semibold'>
          {currentItem.attributes.map((attr) => (
            <div
              key={attr.id}
              className='flex w-full items-center justify-center rounded-md bg-white bg-opacity-10 p-1'
            >
              <Image
                src={`/images/filters/${
                  currentItem.textColorBlack ? 'black' : 'white'
                }/${attr.name}.png`}
                width={100}
                height={100}
                alt={appConstants.alt}
                className='w-8 p-2'
              />
              <div className='flex h-10 w-2/3 flex-col justify-center text-xs uppercase'>
                <span className='opacity-70'>{attr.name}:</span>
                <span className='truncate'>{attr.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Item list */}
      <div className='absolute -bottom-16 left-0 flex h-20 w-full items-center justify-evenly'>
        {data.map((item) => (
          <div
            className='flex flex-col items-center font-KFA'
            key={item.id}
            onClick={() => handleSetCurrentIndex(item.id)}
          >
            <Image
              src={item.avatar}
              alt={appConstants.alt}
              width={100}
              height={100}
              className={`${
                item.id === currentIndex
                  ? 'scale-[1.35]'
                  : 'cursor-pointer hover:scale-[1.35]'
              } h-[80px] w-[80px] scale-100 duration-200`}
            />
            <h3 className='mt-4 text-lg font-semibold leading-3 text-white'>
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalSlideShow;
