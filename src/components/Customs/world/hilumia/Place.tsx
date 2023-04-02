import { appConstants } from '@/config/constants';
import { useHilumiaStore } from '@/store';
import Image from 'next/image';
import React from 'react';

interface Props {
  name: string;
  bgPath: string;
  buildingPath?: string;
  bannerPath: string;
  bgColor: string;
  firstContent: string;
  secondContent?: string;
  charList?: Array<{
    id: number | string;
    name: string;
    img: string;
  }>;
  component?: JSX.Element;
  footer?: {
    img: string;
    content: string;
  };
}

const Place = ({
  bgPath,
  buildingPath,
  bannerPath,
  bgColor,
  firstContent,
  secondContent,
  name,
  footer,
  charList,
  component,
}: Props) => {
  const enabled = useHilumiaStore((state) => state.places);
  const setPlace = useHilumiaStore((state) => state.setPlace);
  const placeName = name;

  const handleDisable = () => {
    setPlace({ [placeName]: false });
  };

  return (
    <section
      className={`${
        enabled[placeName] ? 'opacity-100 visible' : 'invisible opacity-0'
      } duration-700 fixed inset-0 w-screen h-screen`}
    >
      <Image
        alt={appConstants.alt}
        src={bgPath}
        fill
        className="absolute object-cover"
      />
      <div
        className={`${
          buildingPath ? 'bg-black bg-opacity-60' : ''
        } absolute inset-0 cursor-pointer`}
        onClick={handleDisable}
      ></div>
      <div
        className={`${bgColor} absolute duration-700 ${
          buildingPath
            ? 'right-3 h-[30vh] items-center'
            : 'h-fit w-[60%] xl:w-1/2'
        } rounded-2xl flex left-3 bottom-3 ${
          enabled[placeName]
            ? 'translate-y-0 opacity-100'
            : 'translate-y-5 opacity-0'
        }`}
      >
        <Image
          alt={appConstants.alt}
          src={bannerPath}
          width={1000}
          height={1000}
          className={`absolute w-[auto] max-w-[30vw] h-[14vh] ${
            buildingPath
              ? '-top-[28%] left-[62%] lg:left-[63%]'
              : '-top-[50px] left-8'
          }`}
        />
        {buildingPath && (
          <Image
            alt={appConstants.alt}
            src={buildingPath}
            width={1000}
            height={1000}
            className="w-[60vw] lg:w-1/2 h-auto absolute bottom-0"
          />
        )}
        <div
          className={`${
            buildingPath ? 'text-xs ml-auto mr-10 w-4/12' : 'text-md mx-10'
          } text-justify text-white leading-6 flex flex-col pb-8`}
        >
          <h1 className="block p-8"></h1>
          <p
            className={`${
              bgColor === 'bg-black' ? 'text-gold' : ''
            } pt-4 border-t border-white/20 mb-4`}
          >
            {firstContent}
          </p>
          {secondContent && <p className="mb-4">{secondContent}</p>}
          {/* char list */}
          <div
            className={`${
              charList && !component
                ? 'bg-white bg-opacity-10 overflow-y-auto rounded-t-2xl'
                : ''
            } flex-1`}
          >
            {charList &&
              charList.map((char) => <div key={char.id} className=""></div>)}
            {component && component}
          </div>
          {/* footer */}
          {footer?.img && footer.content && (
            <footer className="flex items-center bg-white bg-opacity-10 rounded-lg p-3 my-5">
              <Image
                alt={appConstants.alt}
                src={footer.img}
                width={1000}
                height={1000}
                className="w-8 h-8 mr-3"
              />
              <p className="text-xs text-center">{footer.content}</p>
            </footer>
          )}
        </div>
      </div>
    </section>
  );
};

export default Place;
