import Image from 'next/image';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import {
  DoubleArrowDownIcon,
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SeekIcon,
} from './Icons';
import { useRouter } from 'next/router';
import pathNames from '@/config/pathNames';
import { appConstants } from '@/config/constants';
import songList from '@/datas/songsData';

interface Props {}

const Music = (props: Props) => {
  const musicRef = useRef<HTMLAudioElement>(null);
  const currentSongRef = useRef<HTMLDivElement>(null);
  const pathName = useRouter().pathname;
  const textBlack: boolean =
    [pathNames.gallery, pathNames.garden].some((path) =>
      pathName.includes(path)
    ) || pathName === pathNames.home;

  const textWhite = [pathNames.beanz, pathNames.world].some((path) =>
    pathName.includes(path)
  );

  const [expand, setExpand] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [mouse, setMouse] = useState({
    isDown: false,
    isMove: false,
  });

  const [musicDashboard, setmusicDashboard] = useState(false);
  const [shrinkMusicBar, setShrinkMusicBar] = useState(false);
  const [percentSound, setPercentSound] = useState(20);

  const handleExpand = (): void => {
    setExpand(true);
    setPlaying(true);
  };

  const handleToggleExpand = (): void => {
    setExpand(!expand);
    if (expand) {
      setmusicDashboard(false);
    }
  };

  const handleTogglePlaying = () => {
    setPlaying(!playing);
  };

  const handleSongIndex = (index: number) => {
    if (index === songIndex) return;
    setSongIndex(index);
    setPlaying(true);
  };

  const handlePreviousSong = () => {
    if (songIndex > 0) {
      setSongIndex(songIndex - 1);
    } else {
      setSongIndex(songList.length - 1);
    }
    setPlaying(true);
  };

  const handleNextSong = () => {
    if (songIndex < songList.length - 1) {
      setSongIndex(songIndex + 1);
    } else {
      setSongIndex(0);
    }
    setPlaying(true);
  };

  const handleToggleMusicDaskboard = () => {
    setmusicDashboard(!musicDashboard);
  };

  const handleToggleShrinkMusicBar = () => {
    setShrinkMusicBar(!shrinkMusicBar);
    if (expand) {
      setExpand(false);
      setmusicDashboard(false);
    }
  };

  // sound
  const handleSoundMouseDown = (e: MouseEvent) => {
    setMouse({ ...mouse, isDown: true });
    const element = e.currentTarget.getBoundingClientRect();
    // const x = e.clientX - element.left;
    const y = (e.clientY - element.bottom) * -1;
    const percentSfx = Math.floor((y / element.height) * 100);
    // console.log('Tọa độ của chuột trong phần tử:', y);
    setPercentSound(percentSfx);
    localStorage.setItem('music-sound', JSON.stringify(percentSfx));
  };
  const handleSoundMouseMove = (e: MouseEvent) => {
    setMouse({ ...mouse, isMove: true });
    if (mouse.isDown && mouse.isMove) {
      const element = e.currentTarget.getBoundingClientRect();
      // const x = e.clientX - element.left;
      const y = (e.clientY - element.bottom) * -1;
      const percentSfx = Math.floor((y / element.height) * 100);
      // console.log('Tọa độ của chuột trong phần tử:', y);
      setPercentSound(percentSfx);
      localStorage.setItem('music-sound', JSON.stringify(percentSfx));
    }
  };
  const handleSoundMouseUp = (e: MouseEvent) => {
    setMouse({
      isDown: false,
      isMove: false,
    });
  };

  useEffect(() => {
    if (musicRef.current) {
      if (playing) {
        musicRef.current.play();
      } else {
        musicRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    if (currentSongRef.current) {
      currentSongRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [songIndex, expand]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = percentSound / 100;
    }
  }, [percentSound]);

  useEffect(() => {
    if (localStorage.getItem('music-sound')) {
      const percentSound = JSON.parse(
        localStorage.getItem('music-sound') || '20'
      );
      setPercentSound(percentSound);
    }
  }, []);

  useEffect(() => {
    if (textBlack) {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [textBlack]);

  return (
    <div
      className={`fixed bottom-8 left-0 z-[1003] h-14 select-none px-8 dark:text-white`}
    >
      <div
        className={`${expand ? 'cursor-default' : 'cursor-pointer'} ${
          shrinkMusicBar ? 'w-0' : 'w-fit border-2 border-white/25 bg-white'
        } relative flex h-full justify-center rounded-lg bg-opacity-[0.3] shadow-md duration-200 dark:bg-gray-900 dark:text-white`}
      >
        <div
          onClick={handleToggleShrinkMusicBar}
          className={`${
            textBlack ? 'text-black' : 'text-white'
          } absolute -right-5 top-1/2 z-50 flex h-10 w-10 scale-100 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-white bg-opacity-20 text-xl shadow-md backdrop-blur-2xl duration-200 hover:scale-110 dark:text-white`}
        >
          {shrinkMusicBar ? (
            <span className='-rotate-90'>
              <DoubleArrowDownIcon />
            </span>
          ) : (
            <span className='rotate-90'>
              <DoubleArrowDownIcon />
            </span>
          )}
        </div>
        {!shrinkMusicBar && (
          <>
            <Image
              src='/images/music-man.jpg'
              alt={appConstants.alt}
              width={64}
              height={64}
              onClick={handleExpand}
              className={`duration-200 ${
                expand ? 'h-20 w-20 -translate-y-6' : 'h-16 w-16 -translate-y-2'
              }`}
            />
            <div
              className='flex items-end justify-center px-6 pb-3.5 dark:text-white'
              onClick={handleExpand}
            >
              <span
                className={`${
                  textBlack && !playing ? 'bg-black' : ''
                } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                  playing ? 'animate-wave1 bg-red-600' : ''
                } ${textWhite && !playing ? 'bg-white' : ''} dark:bg-white`}
              ></span>
              <span
                className={`${
                  textBlack && !playing ? 'bg-black' : ''
                } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                  playing ? 'animate-wave2 bg-red-600' : ''
                } ${textWhite && !playing ? 'bg-white' : ''} dark:bg-white`}
              ></span>
              <span
                className={`${
                  textBlack && !playing ? 'bg-black' : ''
                } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                  playing ? 'animate-wave3 bg-red-600' : ''
                } ${textWhite && !playing ? 'bg-white' : ''} dark:bg-white`}
              ></span>
            </div>
          </>
        )}
        <div
          onClick={handleToggleExpand}
          className={`${
            textBlack ? 'text-black' : 'text-white'
          } absolute -top-5 -right-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-white bg-opacity-20 shadow-md backdrop-blur-2xl duration-200 hover:scale-110 dark:text-white`}
        >
          {expand ? (
            <MinusIcon />
          ) : !playing || !shrinkMusicBar ? (
            <PlusIcon />
          ) : (
            <div
              className='flex items-end justify-center px-4'
              onClick={handleExpand}
            >
              <span
                className={`${
                  textBlack && !playing ? 'bg-black' : ''
                } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                  playing ? 'animate-wave1 bg-red-600' : 'hidden'
                } ${textWhite && !playing ? 'bg-white' : ''}`}
              ></span>
              <span
                className={`${
                  textBlack && !playing ? 'bg-black' : ''
                } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                  playing ? 'animate-wave2 bg-red-600' : ''
                } ${textWhite && !playing ? 'bg-white' : ''}`}
              ></span>
              <span
                className={`${
                  textBlack && !playing ? 'bg-black' : ''
                } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                  playing ? 'animate-wave3 bg-red-600' : ''
                } ${textWhite && !playing ? 'bg-white' : ''}`}
              ></span>
            </div>
          )}
        </div>
        {expand && (
          <div className='flex'>
            <div
              className={`${
                textBlack ? 'text-black' : 'text-white'
              } flex w-40 cursor-default flex-col justify-center pr-8 uppercase`}
            >
              {!shrinkMusicBar && (
                <>
                  <h2 className='truncate font-bold dark:text-white'>
                    {songList[songIndex].name}
                  </h2>
                  <h3 className='truncate text-xs opacity-40 dark:text-white'>
                    {songList[songIndex].singer
                      ? songList[songIndex].singer
                      : 'unknown'}
                  </h3>
                </>
              )}
            </div>
            <div
              className={`${textBlack ? 'text-black' : 'text-white'} mr-4 ${
                expand && shrinkMusicBar ? 'ml-6' : ''
              } flex items-center justify-center dark:text-white`}
            >
              <button
                onClick={handlePreviousSong}
                className='scale-100 duration-200 hover:scale-110'
              >
                <SeekIcon />
              </button>
              <button
                onClick={handleTogglePlaying}
                className='scale-100 duration-200 hover:scale-125'
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={handleNextSong}
                className='scale-100 duration-200 hover:scale-110'
              >
                <SeekIcon className='rotate-180' />
              </button>
            </div>
          </div>
        )}
        <audio
          src={songList[songIndex].src}
          onEnded={handleNextSong}
          ref={musicRef}
          autoPlay
          playsInline
        ></audio>
        <div
          className={`${
            expand && !shrinkMusicBar
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          } ${
            musicDashboard ? 'h-96' : 'h-0'
          } absolute bottom-[100%] flex w-full items-center py-5 duration-300`}
        >
          <div
            onClick={handleToggleMusicDaskboard}
            className={`${
              musicDashboard ? '-top-6' : 'top-1'
            } z-1 absolute left-1/2 flex h-10 w-10 -translate-x-1/2 animate-bounce cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-xl text-black`}
          >
            {musicDashboard ? (
              <DoubleArrowDownIcon />
            ) : (
              <span className='rotate-180'>
                <DoubleArrowDownIcon />
              </span>
            )}
          </div>
          <div
            className={`${
              musicDashboard ? 'visible h-full' : 'invisible h-0'
            } flex w-[80%] rounded-xl border-t border-black/20 bg-white py-3 shadow-md duration-200`}
          >
            <div className='flex h-full w-[100%] flex-col items-center overflow-y-auto rounded-xl bg-white px-3 scrollbar-none'>
              {songList.map((song, index) => (
                <div
                  className={`${
                    song.id === songList[songIndex].id
                      ? 'w-full rounded-lg py-4 opacity-75'
                      : `w-[92%] cursor-pointer ${
                          index === songIndex - 1 ? '' : 'border-b'
                        } border-white py-1 opacity-30`
                  } flex items-center bg-black px-3 text-white duration-200`}
                  key={index}
                  onClick={() => handleSongIndex(index)}
                  ref={index === songIndex ? currentSongRef : null}
                >
                  <div className='flex flex-1 flex-col'>
                    <h1 className='truncate font-mono-regular text-2xl font-bold uppercase'>
                      {song.name}
                    </h1>
                    <p className='truncate capitalize opacity-70'>
                      {song.singer ? song.singer : 'unknown'}
                    </p>
                  </div>
                  {song.id === songList[songIndex].id && (
                    <div
                      className='flex items-end justify-center px-4'
                      onClick={handleExpand}
                    >
                      <span
                        className={`${
                          textBlack && !playing ? 'bg-black' : ''
                        } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                          playing ? 'animate-wave1 bg-red-600' : 'hidden'
                        } ${textWhite && !playing ? 'bg-white' : ''}`}
                      ></span>
                      <span
                        className={`${
                          textBlack && !playing ? 'bg-black' : ''
                        } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                          playing ? 'animate-wave2 bg-red-600' : ''
                        } ${textWhite && !playing ? 'bg-white' : ''}`}
                      ></span>
                      <span
                        className={`${
                          textBlack && !playing ? 'bg-black' : ''
                        } bg-opacity-8 ml-0.5 h-0.5 w-1 duration-200 ${
                          playing ? 'animate-wave3 bg-red-600' : ''
                        } ${textWhite && !playing ? 'bg-white' : ''}`}
                      ></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`${
              musicDashboard ? 'visible h-full' : 'invisible h-0'
            } relative ml-auto flex w-[15%] cursor-pointer justify-center overflow-hidden rounded-lg bg-white bg-opacity-70 shadow-md backdrop-blur-2xl`}
            onMouseDown={handleSoundMouseDown}
            onMouseMove={handleSoundMouseMove}
            onMouseUp={handleSoundMouseUp}
            onMouseLeave={handleSoundMouseUp}
          >
            <div
              className='absolute left-0 right-0 bottom-0 flex items-center justify-center bg-white'
              style={{
                height: `${percentSound}%`,
              }}
            >
              <span className='font-mono-light font-semibold'>
                {percentSound}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
