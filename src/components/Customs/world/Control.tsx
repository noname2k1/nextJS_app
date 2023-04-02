import React, { ChangeEvent, useRef, useState } from 'react';
import { MuteIcon, UnmuteIcon } from '@/components/Icons';
import pathNames from '@/config/pathNames';
import PingCircle from '@/components/Customs/PingCircle';
import Link from 'next/link';
interface Props {
  ping?: () => void;
  mainSoundSrc?: string;
}

const Control = ({ ping, mainSoundSrc = '/songs/tokyo-drift.mp3' }: Props) => {
  const mainSoundRef = useRef<HTMLAudioElement>(null);
  const [mute, setMute] = useState(true);
  const [volume, setVolume] = useState(1);
  const handleMute = () => {
    setMute(!mute);
    if (mute) {
      mainSoundRef.current?.play();
    } else {
      mainSoundRef.current?.pause();
    }
  };
  const handlePing = () => {
    ping && ping();
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;
    if (value > 1) {
      setVolume(1);
      value = 1;
    } else if (value <= 0) {
      setVolume(0);
      value = 0;
      setMute(true);
    }
    setVolume(value);
    mainSoundRef.current!.volume = value;
  };

  return (
    <div className='absolute bottom-4 right-4 z-[102] flex items-center'>
      <audio ref={mainSoundRef} src={mainSoundSrc} loop></audio>
      <div
        className={`mr-4 duration-200 ${
          mute
            ? 'invisible scale-75 opacity-0'
            : 'visible scale-100 opacity-100'
        }`}
      >
        <input
          type='range'
          value={volume}
          onChange={handleChangeVolume}
          min={0}
          max={1}
          step={0.1}
          className='h-2 cursor-pointer appearance-none rounded-md bg-white caret-white'
        />
      </div>
      <div className='relative flex h-10 w-fit cursor-pointer items-center opacity-80'>
        {!!ping && (
          <PingCircle
            size={[6, 5]}
            onClick={handlePing}
            onMouseEnter={handlePing}
          />
        )}
        <div
          onClick={handleMute}
          className='ml-2 flex h-8 items-center justify-center rounded-md bg-white bg-opacity-10 py-2 px-4 font-mono-light text-xs font-semibold uppercase text-white hover:bg-opacity-40'
        >
          {mute ? <MuteIcon /> : <UnmuteIcon />}
        </div>
        <Link
          href={pathNames.world}
          className='ml-2 flex h-8 items-center justify-center rounded-md bg-white bg-opacity-10 py-2 px-4 font-mono-light text-xs font-semibold uppercase text-white hover:bg-opacity-40'
        >
          World
        </Link>
      </div>
    </div>
  );
};

export default Control;
