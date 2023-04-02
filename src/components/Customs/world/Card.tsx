import React, { useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import Image from 'next/image';
import { appConstants } from '@/config/constants';
import Link from 'next/link';
interface Props {
  data: {
    header: {
      title: string;
      image: string;
    };
    main: {
      content: string;
      char?: {
        name: string;
        image: string;
      };
    };
  };
  children: JSX.Element;
}

const Card = ({ data, children }: Props) => {
  const renderCard = () => {
    return (
      <div
        className={`animate-fade duration-300 bg-black p-4 rounded-lg shadow-md drop-shadow-md backdrop-blur-sm bg-opacity-70 w-[400px] text-white`}
      >
        <header className="flex items-center pb-2 border-b border-white border-opacity-10">
          <Image
            alt={appConstants.alt}
            src={data.header.image}
            width={16}
            height={16}
            className="invert mr-2"
          />{' '}
          <span className="font-mono-light truncate uppercase">
            {data.header.title}
          </span>
        </header>
        <main>
          <p className="font-sans text-xs py-2 opacity-70">
            {data.main.content}
          </p>
          {data.main.char && (
            <Link
              href={`/collector/${data.main.char.name}`}
              className="group flex items-center p-2 bg-black rounded-md cursor-pointer"
            >
              <Image
                alt={appConstants.alt}
                src={data.main.char.image}
                width={40}
                height={40}
                className="w-10 h-10 rounded-md mr-2"
              />
              <div className="uppercase flex flex-col justify-center font-sans overflow-hidden">
                <span className="text-[10px] opacity-40">Collector</span>
                <span className="text-xs text-gold mt-1 font-semibold font-MSB-regular truncate">
                  {data.main.char.name}
                </span>
              </div>
              <span className="ml-auto font-MSB-regular mr-2 group-hover:mr-1 duration-200">
                →
              </span>
            </Link>
          )}
        </main>
      </div>
    );
  };
  return (
    <div className="">
      <TippyHeadless interactive trigger="click" render={renderCard}>
        {children}
      </TippyHeadless>
    </div>
  );
};

export default Card;
