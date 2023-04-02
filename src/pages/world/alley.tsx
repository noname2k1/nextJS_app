import PingCircle from '@/components/Customs/PingCircle';
import Tooltip from '@/components/Customs/Tooltip';
import Control from '@/components/Customs/world/Control';
import { appConstants } from '@/config/constants';
import WithHeaderHover from '@/layouts/WithHeaderHover';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Props {}

const Alley = (props: Props) => {
  const pingRef = useRef<HTMLAudioElement>(null);
  const gateSoundRef = useRef<HTMLAudioElement>(null);
  const [hightlightSkateBoard, sethightlightSkateBoard] = useState(false);
  const [box, setBox] = useState(false);
  const [allPing, setAllPing] = useState(false);
  const handleHightlightSkateBoard = (): void => {
    gateSoundRef.current?.play();
    sethightlightSkateBoard(!hightlightSkateBoard);
  };
  const handleBox = () => {
    setBox(!box);
  };

  const handleGate = () => {
    gateSoundRef.current?.play();
  };

  const handlePing = () => {
    setAllPing(true);
    pingRef.current?.play();
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (allPing) {
      timer = setTimeout(() => {
        setAllPing(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [allPing]);

  return (
    <section className="relative h-screen w-screen overflow-hidden select-none">
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/world_alley_mobile.jpg'}
        fill
        className="absolute w-screen h-screen bottom-0 right-0 lg:hidden"
      />
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_world_bg.jpg'}
        fill
        className="absolute w-screen h-screen bottom-0 right-0 hidden lg:block"
      />
      <div className="peer/left absolute bottom-0 right-[40%] w-[30%] h-[50%] z-[100] hidden lg:block"></div>
      <div className="peer/right absolute bottom-0 right-0 w-[30%] h-[50%] z-[100] hidden lg:block"></div>
      <div className="peer/top absolute top-[10%] right-[20%] w-[40%] h-[30%] z-[100] hidden lg:block"></div>
      <Tooltip content="Faded with your hometown girl." trigger="click">
        <div className="absolute top-[20%] left-[69%] w-[6%] h-[15%] z-[100] hidden lg:block"></div>
      </Tooltip>
      <Tooltip
        trigger="click"
        content="Ever mysterious, Shao has an unflinching steely gaze. However, it appears she is searching for something...or is it someone?"
      >
        <div className="absolute top-[20%] right-[30%] w-[20%] h-[18%] z-[100] hidden lg:block"></div>
      </Tooltip>
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_lore_char_2.png'}
        fill
        className="peer-hover/top:translate-y-1 peer-hover/left:translate-x-1 peer-hover/right:-translate-x-1 duration-1000 absolute w-screen h-screen bottom-0 right-0 hidden lg:block z-50"
      />
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_world_gate.png'}
        fill
        className="absolute w-screen h-screen bottom-0 right-0 hidden lg:block z-10"
      />
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_lore_skateboard.png'}
        fill
        className={`opacity-0 cursor-pointer absolute w-screen h-screen bottom-0 right-0 hidden lg:block z-10 ${
          hightlightSkateBoard ? 'opacity-100' : ''
        } duration-200`}
      />
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_lore_gus.png'}
        fill
        className={`opacity-0 cursor-pointer absolute w-screen h-screen bottom-0 right-0 hidden lg:block z-10 ${
          box ? 'opacity-100' : ''
        } duration-200`}
      />
      <div
        onClick={handleHightlightSkateBoard}
        className="absolute top-1/2 -translate-y-[120px] right-[14.5%] w-10 h-24 z-50 cursor-pointer hidden lg:block"
      ></div>
      <div
        onClick={handleBox}
        className="absolute top-1/2 -translate-y-[80%] right-[52%] w-10 h-10 z-50 cursor-pointer hidden lg:block"
      ></div>
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_world_gate_glow.png'}
        fill
        className="absolute w-screen h-screen bottom-0 right-0 hidden lg:block z-10 motion-safe:animate-pulse animate-ping"
      />
      <Image
        alt={appConstants.alt}
        src={'/images/world/alley/alley_world_char.png'}
        fill
        className="absolute w-screen h-screen bottom-0 right-0 hidden lg:block z-10"
      />
      {/* ping list */}
      <Tooltip
        trigger="click"
        content="Sloths, frogs, cats, and red pandas hold special significance in the garden. But here in the alley, they’re just masks."
      >
        <PingCircle
          className={`z-[101] opacity-0 hover:opacity-80 top-[32%] left-[6.5%] duration-1000 cursor-pointer ${
            allPing ? 'opacity-80' : ''
          }`}
          size={[8, 5]}
          onClick={handleGate}
        />
      </Tooltip>
      <Tooltip
        trigger="click"
        content="Be careful walking next to a man with a katana."
      >
        <PingCircle
          className={`z-[101] opacity-0 hover:opacity-80 top-[27%] left-[22%] duration-1000 cursor-pointer
        ${allPing ? 'opacity-80' : ''}
        `}
          size={[8, 5]}
          onClick={handleGate}
        />
      </Tooltip>
      <Tooltip
        trigger="click"
        content="That gate...wasn't always there.
        It only revealed itself after you ate the red bean.
        A faint blue portal shimmers within it. Ready to go?"
      >
        <PingCircle
          className={`z-[101] opacity-0 hover:opacity-80 top-[15%] left-[36%] duration-1000 cursor-pointer
        ${allPing ? 'opacity-80' : ''}`}
          size={[8, 5]}
          onClick={handleGate}
        />
      </Tooltip>
      <Tooltip
        trigger="click"
        content="Is it simply a legend? Or does it lead to the garden?"
      >
        <PingCircle
          className={`z-[101] opacity-0 hover:opacity-80 top-[40%] left-[47%] duration-1000 cursor-pointer
        ${allPing ? 'opacity-80' : ''}`}
          size={[8, 5]}
          onClick={handleGate}
        />
      </Tooltip>
      <Tooltip
        trigger="click"
        content="The people working in the alley seem completely oblivious to the magical gate they pass by every day."
      >
        <PingCircle
          className={`z-[101] opacity-0 hover:opacity-80 top-[16%] left-[96%] duration-1000 cursor-pointer
        ${allPing ? 'opacity-80' : ''}`}
          size={[8, 5]}
          onClick={handleGate}
        />
      </Tooltip>
      <Tooltip
        trigger="click"
        content="There’s a lot of rumors about what’s going on beneath the alley... Some say it looks like your hidden folder on OS..."
      >
        <PingCircle
          className={`z-[101] opacity-0 hover:opacity-80 top-[67%] left-[33%] duration-1000 cursor-pointer
        ${allPing ? 'opacity-80' : ''}`}
          size={[8, 5]}
          onClick={handleGate}
        />
      </Tooltip>
      <Control ping={handlePing} />

      <h3 className="font-sans font-black text-white absolute bottom-8 left-8 uppercase text-4xl z-10">
        The alley
      </h3>
      <audio ref={pingRef} src="/songs/sfx-reveal.mp3"></audio>
      <audio ref={gateSoundRef} src="/songs/sfx-gate.mp3"></audio>
    </section>
  );
};

export default WithHeaderHover(Alley);
