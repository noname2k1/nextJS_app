import React, { useState } from 'react';
import Link from 'next/link';
import { LogoWhite } from '../Icons';
import { useRouter } from 'next/router';
import pathNames from '@/config/pathNames';
import useGlobalStore from '@/store/GlobalStore';
import headerRightSideList from '@/datas/headerRightSideList';
import DropDownMenu from '../Customs/DropDownMenu';
import { HeaderItem } from '@/config/interfaces';

interface Props {
  className?: string;
  isDark?: boolean;
}

const Header = ({ className, isDark = true }: Props) => {
  const [navMobileOpen, setNavMobileOpen] = useState(false);
  const router = useRouter();
  const pathName = router.pathname;

  const [darkMode] = useGlobalStore((state) => [state.darkMode]);

  const handleOpenNavMobile = () => {
    setNavMobileOpen(!navMobileOpen);
  };

  const handleClickLink = (path: string): void => {
    if (path === pathName) {
      setNavMobileOpen(false);
    }
  };

  const handleOnClickItemNotLink = (data: HeaderItem['onClick']) => {
    if (typeof data !== 'function' && data) {
      router.push(data, undefined, { shallow: true });
    }
  };

  return (
    <nav
      className={`${
        className ? className : ''
      } fixed top-0 z-[1001] flex w-full items-center justify-between px-4 pt-5 lg:px-8 ${
        navMobileOpen
          ? 'bg-white pb-4 opacity-80 lg:bg-transparent lg:opacity-100'
          : ''
      } dark:text-white ${
        pathName.includes(pathNames.gallery)
          ? 'bg-white text-black dark:bg-gray-900 dark:text-white max-[710px]:px-2 lg:bg-transparent lg:pb-4 lg:dark:bg-transparent'
          : ''
      } pb-4`}
    >
      <Link
        href={pathNames.home}
        className='flex h-7 rounded-md bg-red-700 p-2 hover:bg-red-600'
        onClick={() => handleClickLink(pathNames.home)}
      >
        <LogoWhite />
      </Link>

      <div className='hidden h-full items-center justify-center lg:flex'>
        {headerRightSideList.map((item) => {
          const Wrapper = item.path ? Link : 'div';
          return (
            <DropDownMenu
              disabled={item.path || item.onClick ? true : false}
              data={item.childrens!}
              key={item.id}
            >
              <Wrapper
                href={item.path ? item.path : ''}
                className={`ml-2 flex min-h-[28px] cursor-pointer items-center justify-center truncate rounded bg-neutral-400 p-1.5 px-4 font-mono-light text-[11.2px] uppercase duration-200 hover:bg-opacity-30 dark:text-white ${
                  pathName === item.path
                    ? 'bg-opacity-40 underline'
                    : 'bg-opacity-20'
                }
            ${
              pathName === pathNames.beanz ||
              pathName === pathNames.world ||
              !isDark
                ? 'bg-white text-white'
                : 'text-black'
            }`}
                onClick={
                  item.onClick && !item.path
                    ? () => handleOnClickItemNotLink(item.onClick)
                    : undefined
                }
              >
                {item.label && item.label} {item.rightIcon && item.rightIcon}
              </Wrapper>
            </DropDownMenu>
          );
        })}
      </div>
      <div
        className='flex cursor-pointer flex-col lg:hidden'
        onClick={handleOpenNavMobile}
      >
        <div
          className={`h-0.5 w-[5vw] duration-500 ${
            navMobileOpen || pathName.includes(pathNames.gallery)
              ? 'bg-black'
              : 'bg-white'
          } ${
            navMobileOpen
              ? 'translate-y-[2vw] rotate-45 bg-black'
              : 'dark:bg-white'
          }`}
        ></div>
        <div
          className={`mt-[1.5vw] h-0.5 w-[5vw] duration-500 ${
            navMobileOpen || pathName.includes(pathNames.gallery)
              ? 'bg-black'
              : 'bg-white'
          } ${navMobileOpen ? '-rotate-45 bg-black' : 'dark:bg-white'}`}
        ></div>
      </div>
      <div
        className={`absolute top-[100%] left-0 z-[1000] flex h-screen w-screen flex-col bg-white px-6 text-lg font-extrabold duration-500 lg:hidden ${
          navMobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } backdrop-blur-xl`}
      >
        {headerRightSideList.map((item) => {
          const Wrapper = item.path ? Link : 'div';
          return (
            <Wrapper
              key={item.id}
              href={item.path ? item.path : ''}
              className={`cursor-pointer border-b border-black/10 py-3 uppercase first-of-type:pt-7`}
              onClick={() => handleClickLink(item.path!)}
            >
              {item.label && item.path === pathNames.beanz
                ? pathNames.beanz.split('/')[1]
                : item.label}
            </Wrapper>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
