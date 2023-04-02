import { appConstants } from '@/config/constants';
import WithHeaderMusic from '@/layouts/WithHeaderMusic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {}

const WorldPage = (props: Props) => {
  const placeList: {
    id: number;
    name: string;
    image: string;
    path: string;
  }[] = [
    {
      id: 0,
      name: 'alley',
      image: '/images/world/alley.png',
      path: '/world/alley',
    },
    {
      id: 1,
      name: 'ruins',
      image: '/images/world/ruins.png',
      path: '/world/ruins',
    },
    {
      id: 2,
      name: 'hilumia',
      image: '/images/world/hilumia.png',
      path: '/world/hilumia',
    },
    {
      id: 3,
      name: 'updating...',
      image: '',
      path: '',
    },
  ];
  return (
    <div className='text-olive flex min-h-screen w-full flex-col bg-zinc-800 px-6 pt-20 lg:px-8 lg:pt-32'>
      {placeList.map((place) => (
        <div className='group flex items-center justify-center' key={place.id}>
          <h3 className='mr-16 hidden font-sans text-[100px] font-black text-white text-opacity-10 duration-1000 group-hover:text-opacity-80 md:block'>
            {place.id + 1 < 10
              ? '0' + Number(place.id + 1)
              : Number(place.id + 1)}
          </h3>
          <Link
            href={place.path}
            className='relative mb-5 h-[256px] flex-1 cursor-pointer overflow-hidden rounded-xl bg-black bg-opacity-10'
          >
            <span className='absolute bottom-4 left-6 z-10 font-sans text-[36px] font-black uppercase text-white opacity-0 duration-1000 group-hover:opacity-100'>
              {place.name}
            </span>
            {place.image && (
              <Image
                src={place.image}
                alt={appConstants.alt}
                width={1000}
                height={100}
                className='h-full w-full scale-100 object-cover duration-1000 group-hover:scale-110 group-hover:grayscale-0 md:grayscale'
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default WithHeaderMusic(WorldPage);
