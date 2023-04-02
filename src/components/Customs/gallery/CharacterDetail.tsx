import { appConstants } from '@/config/constants';
import { Azuki } from '@/config/interfaces';
import { useGalleryStore } from '@/store';
import useGlobalStore from '@/store/GlobalStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Tooltip from '../Tooltip';
import SlideShow from '@/components/Slider';

interface Props {}

const CharacterDetail = ({}: Props) => {
  // zustand
  const [darkMode, setDarkMode] = useGlobalStore((state) => [
    state.darkMode,
    state.setDarkMode,
  ]);

  const router = useRouter();
  const pathname = router.pathname;
  const { id } = router.query;
  const type = pathname.includes('gallery/beanz') ? 'Beanz' : 'Azuki';
  const [items, charListFilter] = useGalleryStore((state) => [
    state.items,
    state.charListFilter,
  ]);
  const [bg, setBg] = useState('');
  const [loaded, setloaded] = useState(false);
  const [data, setData] = useState<Azuki>();

  const handleBack = () => {
    router.push(pathname, undefined, { shallow: true });
  };

  const handleLoaded = () => {
    setloaded(true);
  };

  useEffect(() => {
    if (charListFilter.length > 0) {
      setData(
        charListFilter.find(
          (item) =>
            item.name === `${type === 'Beanz' ? 'Bean' : 'Azuki'} #${id}`
        )
      );
      return;
    }
    if (id && items.length > 0) {
      setData(
        items.find(
          (item) =>
            item.name === `${type === 'Beanz' ? 'Bean' : 'Azuki'} #${id}`
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, items, charListFilter]);

  useEffect(() => {
    if (data) {
      switch (data?.attributes.Background.toLowerCase()) {
        case 'red':
          setBg('bg-red-filter');
          break;
        case 'cool gray':
          setBg('bg-cool-gray');
          break;
        case 'off white a':
          setBg('bg-off-white-a');
          break;
        case 'off white b':
          setBg('bg-off-white-b');
          break;
        case 'off white c':
          setBg('bg-off-white-c');
          break;
        case 'off white d':
          setBg('bg-off-white-d');
          break;
        case 'dark blue':
          setBg('bg-dark-blue');
          break;
        case 'dark purple':
          setBg('bg-dark-purple');
          break;
      }
    }
  }, [data]);

  return (
    <section
      className={`${
        id && data ? 'visible opacity-100' : 'invisible opacity-0'
      } ${
        bg.includes('off-white') ? 'text-black' : 'text-white'
      } fixed inset-0 z-[1002] flex h-screen w-screen select-none items-center justify-center duration-200`}
    >
      <div
        className='absolute inset-0 cursor-pointer bg-white opacity-80'
        onClick={handleBack}
      ></div>
      <div className='absolute flex min-h-[55vh] w-[95vw] flex-col items-center justify-center rounded-xl border border-solid bg-neutral-500 bg-opacity-10 max-[710px]:h-[85vh] md:min-h-[60vh] lg:h-[78vh] lg:w-[95vw] 2xl:w-[90vw]'>
        {data && (
          <div
            className={`${bg} absolute inset-[4px] flex rounded-xl max-[710px]:flex-col`}
          >
            <Image
              width={500}
              height={500}
              className={`${
                id && data && loaded
                  ? 'visible opacity-100'
                  : 'invisible opacity-0'
              } mr-5 h-full w-auto rounded-xl duration-200 max-[710px]:mr-0 max-[710px]:h-2/3`}
              alt={appConstants.alt}
              src={
                type === 'Beanz' && darkMode && id
                  ? `https://azkimg.imgix.net/images_squareface/final-${id}.png?dpr=1.25&w=1280`
                  : data.image
              }
              priority
              onLoad={handleLoaded}
              key={data._id}
            />
            <div className='mt-5 flex flex-1 flex-col pr-8 max-[710px]:mx-5 max-[710px]:pr-0'>
              <h4 className='text-xs font-semibold uppercase opacity-60'>
                {type}
              </h4>
              <header className='mb-2 flex items-center text-4xl font-extrabold lg:mb-10'>
                <span className='mr-2'>{id}</span>
                <span className='text-4xl font-black opacity-30'>{'//'}</span>
                <div
                  className='top-3 right-3 ml-auto cursor-pointer px-3 duration-200 hover:scale-125 hover:opacity-50 max-[710px]:absolute'
                  onClick={handleBack}
                >
                  X
                </div>
              </header>
              <div className='grid auto-cols-fr grid-cols-none gap-3 lg:grid-cols-2'>
                {data &&
                  [...Object.entries(data.attributes)].map((item, index) => {
                    const [attr, value] = item;
                    return (
                      <Tooltip content={`${attr}: ${value}`} key={index}>
                        <div className='hidden flex-1 items-center rounded-md bg-white bg-opacity-10 p-3 font-MSB-regular uppercase max-[710px]:min-w-[100%] lg:flex'>
                          {type === 'Beanz' && (
                            <Image
                              width={20}
                              height={20}
                              className='mr-3 h-6 w-6'
                              alt={appConstants.alt}
                              src={`/images/filters/${
                                bg.includes('off-white') ? 'black' : 'white'
                              }/${attr.toLowerCase()}.png`}
                              priority
                            />
                          )}
                          {type === 'Azuki' && (
                            <Image
                              width={20}
                              height={20}
                              className='mr-3 h-6 w-6'
                              alt={appConstants.alt}
                              src={
                                ['ear', 'eyes', 'hair', 'neck', 'type'].indexOf(
                                  attr.toLowerCase()
                                ) === -1
                                  ? `/images/filters/${
                                      bg.includes('off-white')
                                        ? 'black'
                                        : 'white'
                                    }/${attr.toLowerCase()}.png`
                                  : `/images/filters/${
                                      bg.includes('off-white')
                                        ? 'black'
                                        : 'white'
                                    }/azuki/${attr.toLowerCase()}.png`
                              }
                              priority
                            />
                          )}
                          <div className='flex flex-col font-MSB-light'>
                            <div className='text-[10px]'>{attr}</div>
                            <div className='truncate font-black lg:max-w-[8rem] xl:max-w-none'>
                              {value}
                            </div>
                          </div>
                        </div>
                      </Tooltip>
                    );
                  })}
                {data && (
                  <SlideShow
                    data={[...Object.entries(data.attributes)]}
                    bg={bg}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CharacterDetail;
