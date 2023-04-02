import { appConstants } from '@/config/constants';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../../Button';

interface Props {
  endFunction: () => void;
}

const CloudIntro = ({ endFunction }: Props) => {
  const backgroundIntros: string[] = [
    "bg-[url('/images/world/hilumia/clouds/intro-cloud-1.jpg')] scale-105",
    "bg-[url('/images/world/hilumia/clouds/intro-cloud-2.jpg')] scale-110",
    "bg-[url('/images/world/hilumia/clouds/intro-cloud-3.jpg')] scale-125",
    "bg-[url('/images/world/hilumia/clouds/cloud-mask.jpg')] scale-150 duration-[2000] opacity-40 bg-black/10",
  ];
  const [currentCloudIndex, setCurrentCloudIndex] = useState(0);
  const currentCloudPath = backgroundIntros[currentCloudIndex];
  useEffect(() => {
    const timerChangePath = setTimeout(() => {
      if (currentCloudIndex <= backgroundIntros.length - 1) {
        setCurrentCloudIndex(currentCloudIndex + 1);
      }
    }, 1000);
    return () => clearTimeout(timerChangePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCloudIndex]);
  console.log(currentCloudIndex);
  return (
    <section
      className={`fixed z-50 h-screen w-screen duration-1000 ease-linear ${currentCloudPath} bg-cover bg-no-repeat flex items-center justify-center`}
    >
      {currentCloudIndex === backgroundIntros.length && (
        <>
          <Image
            alt={appConstants.alt}
            src={'/images/world/hilumia/map.png'}
            fill
            className="absolute object-cover scale-100"
          />
          <div className="bg-black absolute inset-0 opacity-80 scale-105 flex items-center justify-center"></div>
          <div className="z-30 flex flex-col text-white text-center max-w-xl items-center justify-center">
            <Image
              alt={appConstants.alt}
              src={'/images/world/hilumia/welcome_text.png'}
              width={600}
              height={229}
              className="object-contain h-40 w-auto mx-32 z-[100]"
            />
            <h2 className="uppercase text-base font-semibold z-[100]">
              CROSSROADS OF THE GARDEN
            </h2>
            <p className="text-sm mt-2 p-6 pt-0 pb-4">
              By taking a red bean that reveals a shimmering gate in the Alley,
              Azukis enter a magical world: the Garden. Hilumia is a growing
              city within the Garden that is constantly evolving and being
              shaped by the community.
            </p>
            <Button
              rightIcon={'→'}
              onClick={endFunction}
              rightIconClassName="group-hover/parent:translate-x-1 duration-200"
              className="hover:scale-105 text-xs font-semibold group/parent duration-200 scale-100 uppercase flex items-center bg-white text-black rounded-full py-3 opacity-100 px-6 mr-0"
            >
              explore
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default CloudIntro;
