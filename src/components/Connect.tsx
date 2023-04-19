import { Connect } from '@/config/interfaces';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';

interface Props {
  data: Connect[];
}

const ConnectComponent = ({ data }: Props) => {
  const { pathname, query, push } = useRouter();
  const handleBack = () => {
    push(pathname, undefined, { shallow: true });
  };
  const handleItemClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  return (
    <section
      onClick={handleBack}
      className={`${
        query.modal === 'connect'
          ? 'visible opacity-100'
          : 'invisible opacity-0'
      } fixed inset-0 z-[1004] flex items-center justify-center bg-black bg-opacity-50 text-white duration-200`}
    >
      <div className='rounded-lg bg-red-filter p-3'>
        <header className='text-xl font-black uppercase'>Choose wallet</header>
        {data &&
          data.map((item) => {
            return (
              <div
                key={item.id}
                onClick={handleItemClick}
                className='mt-3 cursor-pointer rounded-lg border border-white/10 bg-white bg-opacity-10 p-4 hover:bg-opacity-30'
              >
                <h1 className='px-8 text-center font-bold uppercase'>
                  {item.label}
                </h1>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ConnectComponent;
