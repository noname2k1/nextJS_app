import SlideShow from '@/components/SlideShow';
import React, { useEffect, useState } from 'react';
import { appConstants } from '@/config/constants';
import WithHeaderMusic from '@/layouts/WithHeaderMusic';

interface Props {}

const GardenPage = (props: Props) => {
  useEffect(() => {
    document.title = `${appConstants.alt
      .charAt(0)
      .toUpperCase()}${appConstants.alt.slice(1)} | The Garden`;
  }, []);
  const backgroundClasses = ['bg-white', 'bg-white', 'bg-white'];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChangeBackground = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative flex h-[400vh] items-center justify-center`}>
      <div
        className={`fixed ${backgroundClasses[currentIndex]} inset-0 h-full w-full`}
      ></div>
      <SlideShow
        textColor='text-black'
        hideLastPaginateItem={false}
        pagination={{
          primaryBg: 'bg-black',
          activeBg: 'bg-red-bean',
        }}
        data={[
          {
            id: 0,
            image: '/images/1.png',
            title: 'FROM THE ALLEY TO THE GARDEN //',
            description: `Azuki is a brand.
            A new kind of brand that we build together.
            A brand for the metaverse. By the community.
            A collection of 10,000 avatars that give you membership access to The Garden. It starts with exclusive streetwear collabs, NFT drops, live events, and much more that will be revealed over time. Community ownership in Azuki allows for a new genre of media which the world has yet to explore. An Azuki is your identity in the metaverse — let's build together.
            The Garden is a corner of the internet where art, community, and culture fuse to create magic. The lines between the physical and digital worlds are blurring and the rules are being rewritten.
            Take the Red Bean. //`,
            btnGroup: [
              {
                id: 0,
                label: 'we did',
                isPrimary: true,
              },
            ],
          },
          {
            id: 1,
            image: '/images/2.png',
            title: 'CREATED BY MANY //',
            description: `The core team is born in Los Angeles, CA - a team of human beans with backgrounds in crypto, technology, and gaming working to build a decentralized brand of the future.`,
            btnGroup: [
              {
                id: 0,
                label: 'The azuki community',
                isPrimary: true,
              },
            ],
          },
          {
            id: 2,
            image: '/images/3.png',
            title: `OWNED BY ALL //`,
            description: `The real team is the broader Azuki community -
            a global community working together to build a decentralized brand of the future:`,
            btnGroup: [
              {
                id: 0,
                label: 'rabbit hole',
                isPrimary: true,
              },
            ],
          },
          {
            id: 3,
            image: '/images/3.png',
            title: `INTO THE
            RABBIT HOLE //`,
            description: `To the ones with the courage to jump down a peculiar rabbit hole.
            One that pulls you away from a world that's created by many and owned by few...`,
            btnGroup: [],
          },
        ]}
        onClick={handleChangeBackground}
      />
    </div>
  );
};

export default WithHeaderMusic(GardenPage);
