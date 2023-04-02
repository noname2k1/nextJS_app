/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';

import Button from './Customs/Button';
import { appConstants } from '@/config/constants';
import { useRouter } from 'next/router';
import pathNames from '@/config/pathNames';

interface Props {
  data: {
    id: number;
    image?: string;
    title?: string;
    description?: string;
    component?: React.ReactNode;
    btnGroup?: {
      id: number;
      label: string;
      isPrimary?: boolean;
      onclick?: () => void;
    }[];
  }[];
  pagination?: {
    primaryBg: string;
    activeBg: string;
  };
  hideLastPaginateItem?: boolean;
  textColor?: string;
  onClick?: (index: number) => void;
}

const SlideShow = ({
  data = [],
  onClick = () => {},
  textColor = 'text-white',
  hideLastPaginateItem = true,
  pagination = {
    primaryBg: 'bg-white',
    activeBg: '',
  },
}: Props) => {
  const { pathname } = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = data[currentIndex];

  const handleSetCurrentIndex = (index: number): void => {
    setCurrentIndex(index);
    onClick(index);
  };

  const handleScrollIntoView = (index: number): void => {
    const el = document.querySelector(`#slide-${index}`);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='flex h-full w-full flex-col'>
      <div className='fixed top-1/2 left-0 z-10 flex -translate-y-1/2 translate-x-8 flex-col'>
        {data.map((item, index) => {
          if (currentIndex === data.length - 1 && hideLastPaginateItem) {
            return null;
          }
          return (
            <div
              onClick={() => handleScrollIntoView(item.id)}
              key={item.id}
              className={`${
                currentIndex === index
                  ? `cursor-default ${pagination.activeBg}`
                  : 'cursor-pointer bg-opacity-10'
              } mb-2 h-24 w-[4px] rounded-md ${
                pagination.primaryBg
              } duration-200`}
            ></div>
          );
        })}
      </div>
      {data.map((item) => (
        <InView key={item.id} threshold={0.5}>
          {({ ref, inView }) => {
            if (inView) {
              handleSetCurrentIndex(item.id);
            }
            return (
              <div
                id={`slide-${item.id}`}
                className={`${
                  inView ? 'visible opacity-100' : 'invisible opacity-0'
                } relative flex h-screen w-full items-center justify-center px-4 duration-300 ease-in-out`}
                ref={ref}
                data-id={item.id}
              >
                <div className='flex h-screen w-[90%] items-center leading-none'>
                  {currentItem.component && currentItem.component}
                  {!currentItem.component && (
                    <div
                      className={`${textColor} z-10 h-full translate-y-44 md:absolute`}
                    >
                      <h3 className='relative w-[65%] font-KFA text-[81px] lg:w-[55%]'>
                        {item.title}
                        {currentIndex === 0 && pathname === pathNames.beanz && (
                          <Image
                            src='/images/bsticker.png'
                            alt={appConstants.alt}
                            className='absolute -top-28 -left-10 w-1/2'
                            width={1000}
                            height={1000}
                          />
                        )}
                      </h3>
                      <p className='w-1/2 font-MSB-regular leading-7'>
                        {item.description}
                      </p>
                      {item.btnGroup?.map((btn) => {
                        return (
                          <Button
                            key={btn.id}
                            className={`${
                              !btn.isPrimary
                                ? 'bg-white bg-opacity-25 hover:bg-opacity-40'
                                : 'bg-black hover:bg-opacity-60'
                            }  mt-6 px-6 py-3 font-KFA text-[16px] uppercase leading-6 text-white`}
                            rightIcon={`${btn.isPrimary ? '↓' : '→'}`}
                            rounded
                            onClick={
                              btn.onclick
                                ? btn.onclick
                                : () => {
                                    handleScrollIntoView(item.id + 1);
                                  }
                            }
                          >
                            {btn.label}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                  {currentItem.image && (
                    <Image
                      src={currentItem.image}
                      alt={appConstants.alt}
                      width={1000}
                      height={1000}
                      className='fixed top-0 right-0 w-full duration-200 ease-out lg:right-12 lg:top-[80px] lg:w-[44%]'
                    />
                  )}
                </div>
              </div>
            );
          }}
        </InView>
      ))}
    </section>
  );
};

export default SlideShow;
