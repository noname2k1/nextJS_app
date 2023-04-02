import Tooltip from '@/components/Customs/Tooltip';
import Card from '@/components/Customs/world/Card';
import Control from '@/components/Customs/world/Control';
import { appConstants } from '@/config/constants';
import WithHeaderHover from '@/layouts/WithHeaderHover';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {}

const Ruins = (props: Props) => {
  return (
    <section className="relative h-screen w-screen select-none">
      <video
        src="/videos/ruins_bg.mp4"
        className="absolute w-screen top-0 bottom-0 h-[100%] object-fill"
        autoPlay
        muted
        loop
      ></video>
      <Control mainSoundSrc="/songs/ruins_main_sound.mp3" />
      <Card
        data={{
          header: {
            title: 'fire',
            image: '/images/world/ruins/fire.svg',
          },
          main: {
            content: 'The first fire still burns bright today.',
            char: {
              name: '696969',
              image: '/images/world/ruins/696969.png',
            },
          },
        }}
      >
        <div className="absolute top-[23%] left-[42%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Link
        href={'/auction'}
        className="absolute top-[24%] left-[37.5%] w-12 h-24 cursor-pointer"
      ></Link>
      <Card
        data={{
          header: {
            title: 'water',
            image: '/images/world/ruins/water.svg',
          },
          main: {
            content: 'Water can flow... or it can crash. Be water, my friend.',
            char: {
              name: 'wombatgod',
              image: '/images/world/ruins/wombatgod.png',
            },
          },
        }}
      >
        <div className="absolute top-[30%] left-[33%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Card
        data={{
          header: {
            title: 'frog',
            image: '/images/world/ruins/frog.svg',
          },
          main: {
            content: `The garden’s inhabitants pay homage to the frog spirit.
            It is believed to have brought forth rains to form
            the rivers, lakes, and oceans that nourished countless lives.`,
          },
        }}
      >
        <div className="absolute top-[37%] left-[40.5%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Card
        data={{
          header: {
            title: 'red panda',
            image: '/images/world/ruins/red_panda.svg',
          },
          main: {
            content: `Some believe that the first flame in the
            garden was kindled by the red panda spirit.`,
            char: {
              name: '0x9a54f65ed7c63dbe87a8652440c43f0149d870be',
              image:
                '/images/world/ruins/0x9a54f65ed7c63dbe87a8652440c43f0149d870be.png',
            },
          },
        }}
      >
        <div className="absolute top-[43%] left-[44.5%] w-12 h-12 cursor-pointer"></div>
      </Card>

      <Card
        data={{
          header: {
            title: 'earth',
            image: '/images/world/ruins/earth.svg',
          },
          main: {
            content: 'In the garden, even the soil is magical.',
            char: {
              name: 'csaw',
              image: '/images/world/ruins/csaw.png',
            },
          },
        }}
      >
        <div className="absolute top-[47%] left-[33%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Card
        data={{
          header: {
            title: 'sloth',
            image: '/images/world/ruins/sloth.svg',
          },
          main: {
            content: 'zzZ.',
            char: {
              name: 'shao',
              image: '/images/world/ruins/shao.png',
            },
          },
        }}
      >
        <div className="absolute top-[49%] left-[39%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Card
        data={{
          header: {
            title: 'lightning',
            image: '/images/world/ruins/lightning.svg',
          },
          main: {
            content: `Let your plans be dark and impenetrable as night,
            and when you move, fall like a thunderbolt.`,
            char: {
              name: 'spiritdao',
              image: '/images/world/ruins/spiritdao.png',
            },
          },
        }}
      >
        <div className="absolute top-[55%] left-[32%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Card
        data={{
          header: {
            title: 'cat',
            image: '/images/world/ruins/cat.svg',
          },
          main: {
            content: `In the vast and endless darkness,
            the cat spirit brought forth lightning,
            sparking energy from nothing.`,
            char: {
              name: 'shrimpwen',
              image: '/images/world/ruins/shrimpwen.png',
            },
          },
        }}
      >
        <div className="absolute top-[60%] left-[42%] w-12 h-12 cursor-pointer"></div>
      </Card>
      <Card
        data={{
          header: {
            title: 'dragon',
            image: '/images/world/ruins/dragon.svg',
          },
          main: {
            content: `The dragon is eternal; a creature that dwells
            within the void, passing between all worlds.`,
            char: {
              name: 'dingaling',
              image: '/images/world/ruins/dingaling.png',
            },
          },
        }}
      >
        <div className="absolute top-[69%] left-[39%] w-12 h-12 cursor-pointer"></div>
      </Card>

      <Tooltip content="...?" trigger="click">
        <div className="absolute bottom-[11%] left-[44.5%] w-5 h-5 cursor-pointer"></div>
      </Tooltip>
      <h3 className="font-sans font-black text-white absolute bottom-8 left-8 uppercase text-4xl z-10">
        ruins
      </h3>
    </section>
  );
};

export default WithHeaderHover(Ruins);
