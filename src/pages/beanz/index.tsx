import HorizontalSlideShow from '@/components/HorizontalSlideShow';
import SlideShow from '@/components/SlideShow';
import React, { useEffect, useState } from 'react';
import beansData from '../../datas/beansData';
import { appConstants } from '@/config/constants';
import WithHeaderMusic from '@/layouts/WithHeaderMusic';
import { useRouter } from 'next/router';
import pathNames from '@/config/pathNames';

interface Props {}

const BeanPage = (props: Props) => {
  const { push } = useRouter();
  useEffect(() => {
    document.title = `${appConstants.alt
      .charAt(0)
      .toUpperCase()}${appConstants.alt.slice(1)} | BEANZ`;
  }, []);
  enum backgroundClasses {
    'bg-red-bean',
    'bg-blue-bean',
    'bg-edamame',
    'bg-gray-900',
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChangeBackground = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative flex h-[400vh] items-center justify-center`}>
      <div
        className={`fixed inset-0 z-10 h-full w-full bg-[url('/images/beanzbgwhite.png')] bg-contain bg-no-repeat opacity-10`}
      ></div>
      <div
        className={`fixed ${backgroundClasses[currentIndex]} inset-0 h-full w-full`}
      ></div>
      <SlideShow
        data={[
          {
            id: 0,
            image: '/images/1.png',
            title: 'FROM THE GARDEN TO THE ALLEY',
            description: `A small species that sprouts from the dirt in the garden. While
            they're earnestly driven by the desire to help their Azuki friends,
            some BEANZ simply can't resist the allure of the alley...`,
            btnGroup: [
              {
                id: 0,
                label: 'trusty sidekick',
                isPrimary: true,
              },
              {
                id: 1,
                label: 'view gallery',
                isPrimary: false,
                onclick: () => {
                  push(`${pathNames.gallery}/beanz`, undefined);
                },
              },
              {
                id: 2,
                label: 'opensea',
                isPrimary: false,
              },
            ],
          },
          {
            id: 1,
            image: '/images/2.png',
            title: '(ALMOST) ALWAYS BY YOUR SIDE',
            description: `Some like to be a sidekick, but others enjoy kicking it alone.`,
            btnGroup: [
              {
                id: 0,
                label: 'for better or worse',
                isPrimary: true,
              },
            ],
          },
          {
            id: 2,
            image: '/images/3.png',
            title: `FOR BETTER...OR WORSE`,
            description: `Being helpful is in their DNA, but some have a slightly different definition of “helpful”...`,
            btnGroup: [
              {
                id: 0,
                label: 'meet the squad',
                isPrimary: true,
              },
            ],
          },
          { id: 3, component: <HorizontalSlideShow data={beansData} /> },
        ]}
        onClick={handleChangeBackground}
      />
    </div>
  );
};

export default WithHeaderMusic(BeanPage);
