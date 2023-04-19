/* eslint-disable react-hooks/exhaustive-deps */
import { SmallDownArrowIcon, UserIcon } from '@/components/Icons';
import navItemList from '@/datas/admin/navItemList';
import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import optionList from '@/datas/admin/optionList';

interface Props {}

const AdminNavbar = (props: Props) => {
  const user = useAuthStore((state) => state.user);

  const [currentUser, setCurrentUser] = useState({
    username: '',
    createdAt: '',
    updatedAt: '',
  });

  const [itemExpand, setItemExpand] = useState({
    id: '',
    expand: false,
  });

  const [mobileNav, setMobileNav] = useState(false);

  const handleExpand = (id: string) => {
    if (id === itemExpand.id) {
      setItemExpand({
        id: '',
        expand: false,
      });
    } else {
      setItemExpand({
        id,
        expand: true,
      });
    }
  };

  const handleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  useEffect(() => {
    if (user._id) {
      const { username, createdAt, updatedAt } = user;
      setCurrentUser({ ...currentUser, username, createdAt, updatedAt });
    }
  }, [user]);

  const renderOptions = () => {
    return (
      <div className='min-w-[20vw] overflow-hidden rounded-md border border-black/10 bg-white shadow-md dark:border-white/10'>
        {optionList.map((option) => {
          return (
            <div
              key={option.id}
              onClick={option.onClick ? option.onClick : () => {}}
              className={`${
                option.danger ? 'text-red-600 hover:bg-red-700' : ''
              } ${
                option.separatorTop ? 'border-t border-black/10' : ''
              } cursor-pointer p-2 pl-4 font-semibold uppercase hover:bg-gray-500 hover:text-white dark:hover:bg-white/10 dark:hover:text-black`}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <button
        onClick={handleMobileNav}
        className='fixed top-2 left-3 flex h-8 flex-col justify-evenly'
      >
        <span className='block h-[3px] w-8 bg-black'></span>
        <span className='block h-[3px] w-8 bg-black'></span>
        <span className='block h-[3px] w-8 bg-black'></span>
      </button>
      <div
        onClick={handleMobileNav}
        className={`${
          mobileNav ? 'visible' : 'invisible'
        } fixed inset-0 z-10 select-none bg-black/60`}
      ></div>
      {/* navbar */}
      <nav
        className={`${
          mobileNav ? 'fixed' : 'sticky max-[980px]:hidden'
        } top-0 z-10 flex h-screen w-fit max-w-[200px] flex-col overflow-x-auto bg-gray-800 py-2 px-3 text-white scrollbar-none md:max-w-sm`}
      >
        <h1 className='border-b-2 border-white/20 pb-2 text-center text-[90%] font-black uppercase'>
          Manager Daskboard
        </h1>
        <div className='mt-4 flex-1'>
          <ul>
            {navItemList.map((navItem) => {
              const Wrapper = navItem.path ? Link : 'div';
              return (
                <div key={navItem.id}>
                  <li
                    onClick={() => handleExpand(navItem.id)}
                    className='md:text-md flex cursor-pointer items-center border-b border-white/10 bg-inherit font-MSB-bold font-medium uppercase hover:bg-gray-700 lg:text-xl'
                  >
                    <Wrapper
                      href={navItem.path ? navItem.path : ''}
                      className='flex flex-1 items-center'
                    >
                      <span className='flex-1 truncate py-2 pl-2'>
                        {navItem.name}
                      </span>{' '}
                      <span
                        className={`${
                          itemExpand.id === navItem.id ? 'mr-0 -rotate-180' : ''
                        } ${
                          navItem.subItems.length === 0 && 'hidden'
                        } mx-2 duration-200`}
                      >
                        <SmallDownArrowIcon />
                      </span>
                    </Wrapper>
                  </li>
                  <div
                    className={`${
                      navItem.id === itemExpand.id &&
                      navItem.subItems.length > 0
                        ? 'visible h-[10rem]'
                        : 'invisible h-0'
                    } flex flex-col justify-center [transition:visible_.2s,height_.2s]`}
                  >
                    {navItem.subItems.length > 0 &&
                      navItem.subItems.map((subItem) => {
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.path}
                            className={`${
                              subItem.special && itemExpand.id === navItem.id
                                ? 'text-red-500 hover:bg-red-600 hover:text-white'
                                : 'hover:bg-gray-500'
                            } block cursor-pointer p-2 pl-4 font-mono-regular uppercase duration-100`}
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </nav>
      {/* user */}
      <div className='fixed right-0 z-[9] m-2'>
        <Tippy interactive render={() => renderOptions()} trigger='click'>
          <button className='z-[1000] flex items-center rounded-lg border border-black/10 bg-white p-2 font-normal duration-200 hover:bg-gray-800 hover:text-white dark:border-white/10 dark:bg-gray-800 dark:hover:bg-gray-600'>
            {currentUser.username}{' '}
            <span className='ml-2'>
              <UserIcon />
            </span>
          </button>
        </Tippy>
      </div>
    </>
  );
};

export default AdminNavbar;
