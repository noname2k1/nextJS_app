import CloudIntro from '@/components/Customs/world/hilumia/CloudIntro';
import Idea from '@/components/Customs/world/hilumia/Idea';
import Place from '@/components/Customs/world/hilumia/Place';
import { appConstants } from '@/config/constants';
import WithHeaderHover from '@/layouts/WithHeaderHover';
import { placeNames, useHilumiaStore } from '@/store';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

interface Props {}

const Hilumia = (props: Props) => {
  const mainSoundRef = useRef<HTMLAudioElement>(null);
  const bubbleSoundRef = useRef<HTMLAudioElement>(null);
  const openSoundRef = useRef<HTMLAudioElement>(null);
  const [mute, setMute] = React.useState(false);
  const [sfx, setSfx] = React.useState(false);
  const [pinEnabled, setPinEnabled] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [intro, setIntro] = React.useState(false);

  const mainPath = '/images/world/hilumia/';
  const generatorPath = (path: string): string => {
    return `${mainPath}${path}`;
  };
  const setPlace = useHilumiaStore((state) => state.setPlace);

  const toggleSound = () => {
    setMute(!mute);
  };

  const toggleSfx = () => {
    setSfx(!sfx);
  };

  const handleHoverPlace = () => {
    if (sfx && bubbleSoundRef.current) {
      bubbleSoundRef.current.volume = 0.5;
      bubbleSoundRef.current.play();
    }
  };

  const handleOpenPlace = () => {
    if (sfx && openSoundRef.current) {
      openSoundRef.current.volume = 0.5;
      openSoundRef.current.play();
    }
  };

  const togglePinEnabled = () => {
    setPinEnabled(!pinEnabled);
  };

  const handleSelectPlace = (placeName: string) => {
    handleOpenPlace();
    setPlace({ [placeName]: true });
  };

  const handleIntroFinished = () => {
    setIntro(false);
  };

  useEffect(() => {
    if (mainSoundRef.current) {
      if (mute) {
        mainSoundRef.current.play();
      } else {
        mainSoundRef.current.pause();
      }
    }
  }, [mute]);

  useEffect(() => {
    const timerLoading = setTimeout(() => {
      setIntro(true);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timerLoading);
  }, []);

  useEffect(() => {}, []);
  if (loading)
    return (
      <section className='fixed inset-0 z-50 flex items-center justify-center bg-black'>
        <Image
          alt={appConstants.alt}
          src={generatorPath('preloader.gif')}
          width={100}
          height={100}
          className='h-auto w-[6vw] object-cover'
        />
      </section>
    );

  if (intro) {
    return <CloudIntro endFunction={handleIntroFinished} />;
  }
  return (
    <section
      className={`relative h-screen w-screen overflow-hidden bg-no-repeat`}
    >
      {/* bg */}

      <Image
        src={generatorPath('map.png')}
        alt={appConstants.alt}
        fill
        className={`h-auto w-full`}
      />

      {/* sound_controls */}
      <div className='absolute bottom-6 right-[2%] flex items-center rounded-lg bg-black bg-opacity-40 p-2 lg:p-3'>
        <label className='relative mr-3 inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            value=''
            className='peer sr-only'
            checked={mute}
            onChange={toggleSound}
          />
          <div className="peer h-6 w-11 rounded-full bg-black bg-opacity-40 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
            <Image
              src={'/images/items/music.png'}
              alt={appConstants.alt}
              width={100}
              height={100}
              className='h-4 w-4'
            />
          </span>
        </label>
        <label className='relative mr-3 inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            value=''
            className='peer sr-only'
            checked={sfx}
            onChange={toggleSfx}
          />
          <div className="peer h-6 w-11 rounded-full bg-black bg-opacity-40 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className='ml-3 font-mono-light text-sm font-semibold uppercase text-white dark:text-gray-300'>
            SFX
          </span>
        </label>
        <label className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            value=''
            className='peer sr-only'
            checked={pinEnabled}
            onChange={togglePinEnabled}
          />
          <div className="peer h-6 w-11 rounded-full bg-black bg-opacity-40 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
            <Image
              src={'/images/items/pin.png'}
              alt={appConstants.alt}
              width={100}
              height={100}
              className='h-4 w-3'
            />
          </span>
        </label>
      </div>
      <audio src='/songs/hilumia.mp3' loop ref={mainSoundRef}></audio>
      <audio src='/songs/pop_sound.mp3' ref={bubbleSoundRef}></audio>
      <audio src='/songs/whoosh.mp3' ref={openSoundRef}></audio>
      {/* place list */}
      <div
        onClick={() => handleSelectPlace(placeNames.dojang)}
        onMouseEnter={handleHoverPlace}
        className='peer/1 absolute top-[8%] left-[32%] h-[5%] w-[3%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.hiluhall)}
        onMouseEnter={handleHoverPlace}
        className='peer/2 absolute top-[20%] left-[12%] h-[18%] w-[13%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.slowpokes)}
        onMouseEnter={handleHoverPlace}
        className='peer/3 absolute top-[27%] left-[38%] h-[8%] w-[6%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.loveisland)}
        onMouseEnter={handleHoverPlace}
        className='peer/4 absolute top-[31%] right-[18%] h-[6%] w-[5%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.ninelives)}
        onMouseEnter={handleHoverPlace}
        className='peer/5 absolute top-[32%] right-[43%] h-[10%] w-[6%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.gardenexpress)}
        onMouseEnter={handleHoverPlace}
        className='peer/6 absolute top-[34%] right-[39%] h-[4%] w-[3%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.fitness)}
        onMouseEnter={handleHoverPlace}
        className='peer/7 absolute top-[40%] left-[31%] h-[7%] w-[5%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.ember)}
        onMouseEnter={handleHoverPlace}
        className='peer/8 absolute bottom-[30%] left-[42%] h-[9%] w-[6.5%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.moda)}
        onMouseEnter={handleHoverPlace}
        className='peer/9 absolute bottom-[31%] left-[30%] h-[4%] w-[3%] cursor-pointer'
      ></div>
      <div
        onClick={() => handleSelectPlace(placeNames.gsp)}
        onMouseEnter={handleHoverPlace}
        className='peer/10 absolute bottom-[16%] right-[16%] h-[14%] w-[16%] cursor-pointer'
      ></div>
      <div
        onClick={handleHoverPlace}
        onMouseEnter={handleHoverPlace}
        className='peer/11 absolute top-[27%] right-[7%] h-[8%] w-[7%] cursor-pointer'
      ></div>

      <div
        onClick={() => handleSelectPlace(placeNames.dojang)}
        onMouseEnter={handleHoverPlace}
        className='group/1 absolute bottom-[92%] left-[28.5%] flex h-[90px] w-[120px] cursor-pointer peer-hover/1:[&>.banner]:scale-100 peer-hover/1:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/dojangpin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/1:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/dojang_banner.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/1:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.hiluhall)}
        onMouseEnter={handleHoverPlace}
        className='group/2 absolute top-[8%] left-[13.5%] flex h-[90px] w-[120px] cursor-pointer peer-hover/2:[&>.banner]:scale-100 peer-hover/2:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/hiluhallpin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/2:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/hiluhall_banner_2.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/2:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.slowpokes)}
        onMouseEnter={handleHoverPlace}
        className='group/3 absolute top-[15%] left-[36%] flex h-[90px] w-[120px] cursor-pointer peer-hover/3:[&>.banner]:scale-100 peer-hover/3:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/slowpokespin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/3:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/slowpokes_banner_2.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/3:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.loveisland)}
        onMouseEnter={handleHoverPlace}
        className='group/4 absolute top-[18.5%] right-[15.5%] flex h-[90px] w-[120px] cursor-pointer peer-hover/4:[&>.banner]:scale-100 peer-hover/4:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/loveislandpin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/4:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/loveisland_banner_2.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/4:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.ninelives)}
        onMouseEnter={handleHoverPlace}
        className='group/5 absolute top-[19.5%] right-[41%] flex h-[90px] w-[120px] cursor-pointer peer-hover/5:[&>.banner]:scale-100 peer-hover/5:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/9pin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/5:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/9lives_banner_2.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/5:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.gardenexpress)}
        onMouseEnter={handleHoverPlace}
        className='group/6 absolute top-[22%] right-[36%] flex h-[90px] w-[120px] cursor-pointer peer-hover/6:[&>.banner]:scale-100 peer-hover/6:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/gardenexpresspin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/6:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/gardenexpress_banner.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/6:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.fitness)}
        onMouseEnter={handleHoverPlace}
        className='group/7 absolute top-[28%] left-[28.5%] flex h-[90px] w-[120px] cursor-pointer peer-hover/7:[&>.banner]:scale-100 peer-hover/7:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/56fitnesspin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/7:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/56fitness_banner_2.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/7:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.ember)}
        onMouseEnter={handleHoverPlace}
        className='group/8 absolute bottom-[38.5%] left-[41%] flex h-[90px] w-[120px] cursor-pointer peer-hover/8:[&>.banner]:scale-100 peer-hover/8:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/emberpin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/8:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/ember_banner_2.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/8:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.moda)}
        onMouseEnter={handleHoverPlace}
        className='group/9 absolute bottom-[35%] left-[26.5%] flex h-[90px] w-[120px] cursor-pointer peer-hover/9:[&>.banner]:scale-100 peer-hover/9:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/modapin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/9:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/moda_banner.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/9:scale-100'
        />
      </div>
      <div
        onClick={() => handleSelectPlace(placeNames.gsp)}
        onMouseEnter={handleHoverPlace}
        className='group/10 absolute bottom-[30%] right-[19%] flex h-[90px] w-[120px] cursor-pointer peer-hover/10:[&>.banner]:scale-100 peer-hover/10:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/pins/gsppin.png'}
          alt={appConstants.alt}
          width={40}
          height={40}
          className={`${
            !pinEnabled ? 'opacity-0 duration-200' : 'opacity-100 duration-75'
          } pin mx-auto mt-auto delay-100 group-hover/10:opacity-0`}
        />
        <Image
          src={'/images/world/hilumia/gsp_banner.png'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/10:scale-100'
        />
      </div>
      <div
        onClick={handleHoverPlace}
        onMouseEnter={handleHoverPlace}
        className='group/10 absolute top-[14.5%] right-[7%] flex h-[90px] w-[120px] cursor-pointer peer-hover/11:[&>.banner]:scale-100 peer-hover/11:[&>.pin]:opacity-0'
      >
        <Image
          src={'/images/world/hilumia/under2.svg'}
          alt={appConstants.alt}
          width={500}
          height={500}
          className='banner absolute mx-auto mt-auto h-[90px] w-[120px] scale-0 duration-200 group-hover/11:scale-100'
        />
      </div>
      {/* dojang */}
      <Place
        bgPath='/images/world/hilumia/2.jpg'
        bannerPath='/images/world/hilumia/dojang.png'
        bgColor='bg-red-bean'
        name={placeNames.dojang}
        footer={{
          img: '/images/world/hilumia/ninja.png',
          content:
            "Enrollment in the Dojo is granted to those holding the Ninja badge in the Collector's Profile",
        }}
        firstContent='Shrouded in shadows and secrecy, the ninjas of the Dojang train day and night, while members of their clan are dispatched around the garden for purposes unknown.'
        secondContent="Most recently, some Azuki reported that they saw some of the Dojang's ninjas headed for the deep desert, but to what nefarious purpose, we can only speculate…"
      />
      {/* slowpokes */}
      {/* hiluhall */}
      <Place
        bgPath='/images/world/hilumia/1.jpg'
        buildingPath='/images/world/hilumia/hiluhall.png'
        bannerPath='/images/world/hilumia/hiluhall_banner.png'
        bgColor='bg-edamame'
        name={placeNames.hiluhall}
        firstContent='A greenhouse complex at the heart of what&#39;s new. The epicenter
        of new experiments, inventions, and ideas that will shape the future
        of the garden.'
        secondContent='The building itself was founded years ago by a mysterious group of
        dreamers who wanted to bring the garden to life. Who they are and
        what they&#39;re working on next is always a mystery.'
      />
      {/* slowpokes */}
      <Place
        bgPath='/images/world/hilumia/3.jpg'
        buildingPath='/images/world/hilumia/slowpokes.png'
        bannerPath='/images/world/hilumia/slowpokes_banner.png'
        bgColor='bg-coffee'
        name={placeNames.slowpokes}
        firstContent="Growth has been slow for Hilumia's favorite toy store. It started out as a little stand that sold red and blue bean plushies. Slowpoke (the owner) might work slow, but he always drops the highest quality products."
        secondContent='Slowpoke works strange, unpredictable hours. The shop closes in pockets throughout the day based on his erratic nap schedule.'
      />

      {/* loveisland */}
      <Place
        bgPath='/images/world/hilumia/3.jpg'
        bannerPath='/images/world/hilumia/loveisland.png'
        bgColor='bg-tutti'
        name={placeNames.loveisland}
        firstContent="64 Azuki enter the Love Island compounds… two winners are selected. The show's producers swear that the heart-shaped lake that Love Island is seated on is completely, 100% real, just like the competition to find the garden's most eligible Azuki."
        secondContent='Could it be your turn next?'
        footer={{
          img: '/images/world/hilumia/azuki_love_island.png',
          content:
            "Access to the tropical paradise of Love Island is unlocked through winning Azuki Love Island and holding the badge in your Collector's Profile.",
        }}
      />

      {/* 9lives */}
      <Place
        bgPath='/images/world/hilumia/2.jpg'
        buildingPath='/images/world/hilumia/9lives.png'
        bannerPath='/images/world/hilumia/9lives_banner.png'
        bgColor='bg-blue-bean'
        name={placeNames.ninelives}
        firstContent='9 Lives Arcade bridges fans of old classics and enthusiasts of modern gaming. The sounds from the arcade can be heard at all hours of day, especially when a big tournament or event is happening. Bobu has been seen here losing to kids half his age.'
      />

      {/* gardenExpress */}
      <Place
        bgPath='/images/world/hilumia/2.jpg'
        bannerPath='/images/world/hilumia/gardenexpress.png'
        bgColor='bg-blue-bean'
        name={placeNames.gardenexpress}
        component={<Idea />}
        firstContent='Got a suggestion for sprucing up the city or for Azuki as a brand? Drop your note into the Garden Express and your message will be in the Hilu Hall mailroom in no time.'
      />

      {/* 56fitness */}
      <Place
        bgPath='/images/world/hilumia/5.jpg'
        bannerPath='/images/world/hilumia/56fitness.png'
        bgColor='bg-gold'
        name={placeNames.fitness}
        firstContent="The strongest community is the one that grows together. That's the spirit of 56 Fitness, Hilumia's premier gym. Everyone at 56 Fitness works hard and supports each other- whether its pre-dawn earlybirds, night owls after a hard day of work, or weekend warriors."
        secondContent="* It's also Ed's gym of choice… just don't offer him a post-workout soy milk recovery drink."
        footer={{
          img: '/images/world/hilumia/ngl.png',
          content:
            "Membership to the gym is granted by holding an NGL badge in the Collector's Profile",
        }}
      />

      {/* ember */}
      <Place
        bgPath='/images/world/hilumia/5.jpg'
        buildingPath='/images/world/hilumia/ember.png'
        bannerPath='/images/world/hilumia/ember_banner.png'
        bgColor='bg-lentil'
        name={placeNames.ember}
        firstContent="While some people are content with browsing through Hilumia's crowded lanes of shops, those in the know head straight for the newly opened stores at Ember Square."
        secondContent='Featuring the newest designs and styles from the far corners of the garden (and even the alley), Ember Square is the place to keep up with the styles of today and tomorrow.'
      />

      {/* moda */}
      <Place
        bgPath='/images/world/hilumia/5.jpg'
        bannerPath='/images/world/hilumia/moda.png'
        bgColor='bg-black-bean'
        name={placeNames.moda}
        firstContent='The curators of MODA are always discovering new creations made from the citizens of Hilumia. MODA membership is awarded to a wide variety of talented artists who all follow one simple rule:'
        secondContent='Dope art only.'
        footer={{
          img: '/images/world/hilumia/moda_footer.png',
          content:
            "Exhibition at the museum is granted by holding a MODA Exhibitor badge in the Collector's Profile",
        }}
      />

      {/* gsp */}
      <Place
        bgPath='/images/world/hilumia/6.jpg'
        bannerPath='/images/world/hilumia/gsp.png'
        bgColor='bg-black'
        name={placeNames.gsp}
        firstContent="If you can't skate the metaverse on a golden skateboard imbued by the power of the eternal dragon, do the next best thing and ride down to the Golden Skate Park. If you're lucky, you might just catch one of the nine golden skateboards shredding the park."
      />

      {/* bird */}
      {/* <div className="bird bg-[url('/images/world/hilumia/bird.png')] absolute w-10 h-10 bottom-20 bg-no-repeat bg-cover"></div> */}
    </section>
  );
};

export default WithHeaderHover(Hilumia);
