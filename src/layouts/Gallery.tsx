/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@/components/partials/Header';
import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useTransition,
} from 'react';
import { NextPage, NextComponentType, NextPageContext } from 'next';
import Music from '@/components/Music';
import { useDebounceValue } from '@/components/hooks';
import Toggle from '@/components/Customs/Toggle';
import Head from 'next/head';
import CheckBox from '@/components/Customs/CheckBox';
import galleryFilterList, { Children, types } from '@/datas/galleryFilterList';
import {
  CameraIcon,
  FilterIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
} from '@/components/Icons';
import { useGalleryStore } from '@/store';
import { appConstants } from '@/config/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Azuki, Primary } from '@/config/interfaces';
import Tooltip from '@/components/Customs/Tooltip';
import Counter from '@/components/Customs/Counter';
import CharacterDetail from '@/components/Customs/gallery/CharacterDetail';
import { filterBean, getBeans, getOneBean } from '@/services/beanService';
import {
  filterAzukis,
  filterGoldenAzukis,
  getAzukis,
  getGoldenAzukis,
  getOneAzuki,
} from '@/services/azukiService';
import useGlobalStore from '@/store/GlobalStore';
import axios from 'axios';
import { convertToTitleCase } from '@/utils';

enum debounceTime {
  filterChar = 300,
  filterAttr = 300,
}

const Gallery = <P extends object>(
  WrappedComponent: NextComponentType<NextPageContext, any, P>
) => {
  const WithLayoutComponent: NextPage<P> = (props: P) => {
    // zustand
    const [
      items,
      filterValue,
      childsSelected,
      sumOfAttrSelected,
      charListFilter,
      count,
      error,
      setItems,
      setFilterValue,
      setChildsSelected,
      setSumOfAttrSelected,
      setCharListFilter,
      setCount,
      setError,
    ] = useGalleryStore((state) => [
      state.items,
      state.filterValue,
      state.childsSelected,
      state.sumOfAttrSelected,
      state.charListFilter,
      state.count,
      state.error,
      state.setItems,
      state.setFilterValue,
      state.setChildsSelected,
      state.setSumOfAttrSelected,
      state.setCharListFilter,
      state.setCount,
      state.setError,
    ]);
    const [darkMode, setDarkMode] = useGlobalStore((state) => [
      state.darkMode,
      state.setDarkMode,
    ]);
    const [hideFilterAttrs, setHideFilterAttrs] = useState(false);
    const [filterBarMobile, setfilterBarMobile] = useState(false);

    const router = useRouter();
    const pathname = router.pathname;
    const query = router.query;

    const currentType = pathname === '/gallery' ? types.azuki : types.bean;

    const filterSearchRef = useRef<HTMLInputElement>(null);
    const [itemSelected, setItemSelected] = useState<{
      id: string;
      expand: boolean;
      childrens: Children[];
    }>({
      id: '',
      expand: false,
      childrens: [],
    });
    const [filterAttributes, setFilterAttributes] = useState<{
      id: string;
      value: string;
      data: Children[];
    }>({
      id: '',
      value: '',
      data: [],
    });

    const [loading, setLoading] = useState({
      serial: false,
      attributes: false,
    });

    const handleCurrentType = (type: types.azuki | types.bean) => {
      if (type === types.bean) {
        router.push('/gallery/beanz', undefined, { shallow: true });
      }
      if (type === types.azuki) {
        router.push('/gallery', undefined, { shallow: true });
      }
    };

    const handleClearFilerValue = () => {
      // console.log('clear');
      setFilterValue('');
      setCharListFilter([]);
      setChildsSelected([]);
      setSumOfAttrSelected(0);
      setHideFilterAttrs(false);
      setLoading({ ...loading, serial: false });
      setError({
        status: 200,
        message: '',
      });
    };

    const handleDarkMode = () => {
      setDarkMode(!darkMode);
    };
    const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const filterValue = e.target.value;
      setFilterValue(filterValue);
      if (filterValue) {
        setHideFilterAttrs(true);
        setLoading({ ...loading, serial: true });
      } else {
        handleClearFilerValue();
      }
    };
    const handleItemSelected = (id: string, childrens: Children[]): void => {
      if (itemSelected.id === id) {
        setItemSelected({ ...itemSelected, id, expand: !itemSelected.expand });
        setFilterAttributes({
          id: '',
          value: '',
          data: [],
        });
      } else {
        setItemSelected({ id, expand: true, childrens });
      }
      setFilterAttributes({
        ...filterAttributes,
        id,
        value: '',
      });
    };

    const handleChildSelect = (parent: Primary, children: Primary): void => {
      if (childsSelected.find((item) => item.parent.id === parent.id)) {
        // console.log('parent exist');
        setChildsSelected(
          childsSelected.map((item) => {
            if (item.parent.id === parent.id) {
              if (item.childrens.find((child) => child.id === children.id)) {
                setSumOfAttrSelected(sumOfAttrSelected - 1);
                return {
                  ...item,
                  childrens: item.childrens.filter(
                    (child) => child.id !== children.id
                  ),
                };
              } else {
                setSumOfAttrSelected(sumOfAttrSelected + 1);
                return {
                  ...item,
                  childrens: [...item.childrens, children],
                };
              }
            } else {
              return item;
            }
          })
        );
      } else {
        setSumOfAttrSelected(sumOfAttrSelected + 1);
        setChildsSelected([
          ...childsSelected,
          {
            parent,
            childrens: [children],
          },
        ]);
      }
    };

    const handleFilterBarMobile = () => {
      setfilterBarMobile(!filterBarMobile);
    };

    const handleFilterAttribute = (e: ChangeEvent<HTMLInputElement>): void => {
      setLoading({ ...loading, attributes: true });
      const filterAttrValue = e.target.value;
      if (filterAttrValue) {
        setFilterAttributes({
          ...filterAttributes,
          value: filterAttrValue,
          data: [],
        });
      } else {
        setFilterAttributes({
          ...filterAttributes,
          value: '',
        });
      }
      setTimeout(() => {
        setLoading({ ...loading, attributes: false });
      }, debounceTime.filterAttr);
    };

    const handleRefresh = async () => {
      const randomPage = Math.max(2, Math.floor(Math.random() * (count / 30)));
      let data = {
        success: false,
        data: [],
      };
      const attributes: {
        [key: string]: any;
      } = {};
      childsSelected.forEach((item) => {
        if (item.childrens.length > 0) {
          attributes[convertToTitleCase(item.parent.title)] = item.childrens
            .map((child) => {
              return convertToTitleCase(child.title);
            })
            .join(',');
        }
      });
      if (pathname.includes('/beanz')) {
        if (sumOfAttrSelected > 0) {
          data = await filterBean(attributes, randomPage);
        } else {
          data = await getBeans(randomPage);
        }
      } else {
        if (darkMode) {
          if (sumOfAttrSelected > 0) {
            data = await filterGoldenAzukis(attributes, randomPage);
          } else {
            data = await getGoldenAzukis(randomPage);
          }
        } else {
          if (sumOfAttrSelected > 0) {
            data = await filterAzukis(attributes, randomPage);
          } else data = await getAzukis(randomPage);
        }
      }
      if (data.success) {
        if (sumOfAttrSelected > 0) {
          console.log('filter');
          setCharListFilter(data.data);
        } else {
          setItems(data.data);
        }
      }
      return;
    };

    const debouncedFilterValue = useDebounceValue(
      filterValue,
      debounceTime.filterChar
    );
    const debouncedFilterAttr = useDebounceValue(
      filterAttributes.value,
      debounceTime.filterAttr
    );
    useEffect(() => {
      if (!debouncedFilterValue) {
        setCharListFilter([]);
        setError({
          status: 200,
          message: '',
        });
        return;
      }
      const getOnecharacter = async () => {
        try {
          let data: Azuki;
          if (pathname.includes('/beanz')) {
            const getOneChar = await getOneBean(+debouncedFilterValue);
            data = getOneChar.data as Azuki;
          } else {
            const getOneChar = await getOneAzuki(+debouncedFilterValue);
            data = getOneChar.data as Azuki;
          }
          setError({
            status: 200,
            message: '',
          });
          setCharListFilter([data]);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
              setError({
                status: 400,
                message: 'No character found',
              });
              return setCharListFilter([]);
            }
          }
        }
      };
      getOnecharacter();
      setLoading({ ...loading, serial: false });
    }, [debouncedFilterValue]);

    useEffect(() => {
      // console.log('chay');
      const data = itemSelected.childrens.filter(
        (item) =>
          item.title
            .toLowerCase()
            .indexOf(debouncedFilterAttr.toLowerCase()) !== -1
      );
      setFilterAttributes({
        ...filterAttributes,
        data,
      });
      setLoading({ ...loading, attributes: false });
    }, [debouncedFilterAttr]);

    useEffect(() => {
      if (filterSearchRef.current) {
        filterSearchRef.current.focus();
      }
    }, [itemSelected.expand]);
    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);

    useEffect(() => {
      if (query.id) {
        document.title = `azuki-clone-by-Ninh-Nam | No. ${query.id}`;
      }
    }, [query]);

    useEffect(() => {
      if (!filterValue) {
        handleClearFilerValue();
      }
    }, [filterValue]);

    return (
      <>
        <Header />
        <section className='font-MSB-boldtext-black flex h-screen w-screen select-none overflow-x-hidden px-8 pt-16 text-black dark:bg-gray-900 dark:text-white max-[710px]:px-2 lg:pt-28'>
          <Head>
            <title>azuki-clone-by-Ninh-Nam | Gallery</title>
          </Head>
          {/* nav */}
          <div
            onClick={handleFilterBarMobile}
            className={`${
              filterBarMobile ? 'visible' : 'invisible'
            } fixed inset-0 z-[1001] bg-white bg-opacity-50 duration-200`}
          ></div>
          <nav
            className={`${
              filterBarMobile
                ? 'fixed right-0 top-0 h-[100vh] min-w-[50vw] px-4'
                : 'sticky top-0 hidden h-[calc(100vh-10rem)] w-1/4 lg:block'
            } z-[1002] bg-white dark:bg-gray-900`}
          >
            <header
              className={`${
                darkMode ? 'text-golden' : ''
              } 'border-b border-b border-black/10 pb-6 pt-3 text-xl font-black uppercase`}
            >
              Filter
            </header>
            <div className='hide-scrollbar hide-scroll flex max-h-[calc(100vh-4.5rem)] flex-1  flex-col overflow-y-scroll py-6 lg:max-h-[calc(100vh-14rem)]'>
              <div
                onClick={handleDarkMode}
                className={`${
                  currentType === types.bean
                    ? 'hover:cursor-[url("/images/items/bean-mouse-cursor.png"),_pointer]'
                    : ''
                } flex cursor-pointer items-center border-b border-black/10 py-3`}
              >
                <div className='flex flex-1 items-center justify-center'>
                  {currentType === types.azuki ? (
                    <Image
                      alt={appConstants.alt}
                      src={'/images/golden.gif'}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <CameraIcon />
                  )}
                  <div
                    className={`${
                      currentType === types.azuki
                        ? 'text-golden'
                        : 'text-selfie'
                    } ml-2 flex flex-1 items-center whitespace-nowrap text-xs font-black uppercase`}
                  >
                    {currentType === types.azuki
                      ? 'Golden Mode'
                      : 'Selfie Mode'}
                  </div>
                </div>
                <Toggle
                  checked={darkMode}
                  onChange={handleDarkMode}
                  size='medium'
                  checkedGolden={currentType === types.azuki}
                  checkedSelfie={currentType === types.bean}
                  className='mr-1'
                  // checkedBg="checked:bg-gold checked:after:bg-gold checked:focus:bg-gold"
                />
              </div>
              {/* sort by serial - begin */}
              <div className='flex items-center justify-center border-b border-black/10 py-3 focus-within:border-black dark:focus-within:border-white'>
                <Image
                  alt={appConstants.alt}
                  src={
                    !darkMode
                      ? '/images/filters/black/search.png'
                      : '/images/filters/white/search.png'
                  }
                  width={30}
                  height={30}
                />
                <input
                  type='text'
                  name='filter'
                  placeholder='Sort by serial...'
                  onChange={handleFilterInputChange}
                  value={filterValue}
                  className='text-md ml-2 flex-1 font-sans font-medium outline-none dark:bg-gray-900 dark:text-white'
                  autoComplete=''
                />
                <div
                  className={`${
                    filterValue ? 'visible opacity-100' : 'invisible opacity-0'
                  } hidden px-2 duration-300 min-[1170px]:block`}
                >
                  {loading.serial ? (
                    <Image
                      alt={appConstants.alt}
                      src={'/images/items/loading.gif'}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <div
                      className='text-md cursor-pointer p-2 font-mono-regular'
                      onClick={handleClearFilerValue}
                    >
                      X
                    </div>
                  )}
                </div>
              </div>
              {/* sort by serial - end */}
              {/* other Items - begin */}
              {galleryFilterList.map((item) => {
                if (item.types.indexOf(currentType) !== -1) {
                  const isSelectedItem: boolean = item.id === itemSelected.id;
                  const selectedItemHasChildren = childsSelected.find(
                    (children) => children.parent.id === item.id
                  );
                  const data =
                    filterAttributes.data.length > 0 || filterAttributes.value
                      ? filterAttributes.data
                      : item.children[currentType];
                  return (
                    <div
                      className={`${
                        hideFilterAttrs
                          ? 'invisible opacity-0'
                          : 'visible opacity-100'
                      } duration-200 `}
                      key={item.id}
                    >
                      <div
                        className='flex cursor-pointer items-center border-b border-black/10 py-3 hover:opacity-80'
                        key={item.id}
                        onClick={() =>
                          handleItemSelected(
                            item.id,
                            item.children[currentType]
                          )
                        }
                      >
                        {item.image[currentType] && (
                          <Image
                            alt={appConstants.alt}
                            src={
                              !darkMode
                                ? item.image[currentType]
                                : item.image[currentType].replace(
                                    'black',
                                    'white'
                                  )
                            }
                            width={28}
                            height={28}
                          />
                        )}
                        <span className='ml-2 text-xs font-semibold uppercase dark:text-white'>
                          {item.title}
                        </span>
                        {selectedItemHasChildren &&
                          selectedItemHasChildren.childrens.length > 0 && (
                            <span className='ml-2 rounded-[4px] bg-gray-300 px-1.5 py-0.5 font-mono-light text-xs font-semibold'>
                              {selectedItemHasChildren.childrens.length}
                            </span>
                          )}
                        <div className='ml-auto mr-1 dark:text-white'>
                          {isSelectedItem && itemSelected.expand ? (
                            <MinusIcon />
                          ) : (
                            <PlusIcon />
                          )}
                        </div>
                      </div>
                      {itemSelected.expand && isSelectedItem && (
                        <div className='flex max-h-72 cursor-pointer flex-col overflow-y-scroll border-b border-black/10 pb-2'>
                          {/* filter attr by search */}
                          {filterAttributes.id === item.id && (
                            <div className='mb-1 flex items-center border border-gray-300 outline-black scrollbar scrollbar-thumb-gray-900 focus-within:border-black dark:border-gray-600 dark:bg-gray-900 dark:scrollbar dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-100 dark:focus-within:border-white'>
                              <input
                                type='text'
                                className='flex-1 border-none p-2 font-sans font-extralight outline-none dark:bg-gray-900'
                                placeholder='Search...'
                                onChange={handleFilterAttribute}
                                value={filterAttributes.value}
                                ref={filterSearchRef}
                              />
                              {loading.attributes && filterAttributes.value && (
                                <Image
                                  alt={appConstants.alt}
                                  src='/images/world/hilumia/preloader.gif'
                                  width={20}
                                  height={20}
                                  className='mr-0.5'
                                />
                              )}
                            </div>
                          )}
                          {data!.map((child) => {
                            return (
                              <div
                                className='ml-2 flex items-center'
                                key={child.id}
                              >
                                <CheckBox
                                  checked={
                                    childsSelected.findIndex(
                                      (childItem) =>
                                        childItem.parent.id === item.id &&
                                        childItem.childrens.findIndex(
                                          ({ id, title }) =>
                                            id === child.id &&
                                            title === child.title
                                        ) !== -1
                                    ) !== -1
                                  }
                                  id={child.id}
                                  onChange={() =>
                                    handleChildSelect(
                                      {
                                        id: item.id,
                                        title: item.title,
                                      },
                                      {
                                        id: child.id,
                                        title: child.title,
                                      }
                                    )
                                  }
                                  className='mr-2'
                                />
                                <label
                                  className='flex-1 cursor-pointer py-2 font-mono-light text-sm uppercase'
                                  htmlFor={child.id}
                                >
                                  {child.title}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
              {/* other Items - end */}
            </div>
          </nav>
          <div className='flex-1 lg:px-8'>
            <header className='fixed right-0 left-0 top-16 z-[50] flex items-center border-b border-black/10 bg-white px-8 pb-4 dark:bg-gray-900 max-[710px]:px-2 lg:static lg:px-0'>
              <div className='rounded-xl bg-gray-200 p-1 text-xl font-black dark:bg-gray-800'>
                <button
                  className={`${
                    currentType === types.azuki
                      ? `bg-white dark:bg-gray-500 ${
                          !pathname.includes('/beanz')
                            ? 'cursor-default'
                            : 'cursor-pointer'
                        }`
                      : 'hover:bg-gray-300'
                  } rounded-xl p-1.5 uppercase duration-200 max-md:px-2 max-md:text-[3vw]`}
                  onClick={() => handleCurrentType(types.azuki)}
                >
                  Azuki
                </button>
                <button
                  className={`${
                    currentType === types.bean
                      ? `bg-white dark:bg-gray-500 ${
                          pathname.includes('/beanz')
                            ? 'cursor-default'
                            : 'cursor-pointer'
                        }`
                      : 'hover:bg-gray-300'
                  } rounded-xl p-1.5 uppercase duration-200 max-md:px-2 max-md:text-[3vw]`}
                  onClick={() => handleCurrentType(types.bean)}
                >
                  Beanz
                </button>
              </div>
              <div className='ml-auto flex items-center'>
                <Counter number={count} />
                <div
                  onClick={handleRefresh}
                  className='group mx-4 flex cursor-pointer items-center justify-center rounded-md bg-gray-300 py-1 px-2 hover:bg-gray-400 dark:bg-gray-600 hover:dark:bg-gray-700 lg:py-2 lg:px-4'
                >
                  <span className='duration-500 group-hover:-rotate-[180deg]'>
                    <RefreshIcon />
                  </span>
                </div>
                <div
                  onClick={handleFilterBarMobile}
                  className='cursor-pointer p-2 duration-200 hover:text-off-white-d dark:text-white dark:hover:text-black-bean lg:hidden'
                >
                  <FilterIcon />
                </div>
              </div>
            </header>
            <div className='mt-10 mb-4 flex items-center font-mono-regular text-xs uppercase'>
              Filters
              <span className='ml-2 rounded-md bg-gray-200 py-0.5 px-2 text-xs dark:bg-gray-600'>
                {sumOfAttrSelected}
              </span>
              <div className='ml-4 flex max-w-[65vw] flex-1 items-center gap-4 overflow-x-auto md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-[65vw]'>
                {filterValue && (
                  <div>
                    <div
                      onClick={() => setFilterValue('')}
                      className='group cursor-pointer truncate rounded-3xl border border-black border-opacity-30 p-2 px-3 duration-200 hover:bg-neutral-300 dark:border-white hover:dark:bg-gray-800'
                    >
                      serial: {filterValue}
                      <span className='ml-2 scale-105 text-base text-gray-400 duration-200 group-hover:scale-110 group-hover:text-gray-600'>
                        X
                      </span>
                    </div>
                  </div>
                )}
                {!filterValue &&
                  childsSelected.map((item) => {
                    if (item.childrens.length > 0) {
                      return item.childrens.map((childItem) => {
                        return (
                          <div key={childItem.id}>
                            <Tooltip
                              disabled
                              content={`${item.parent.title}: ${childItem.title}`}
                            >
                              <div
                                onClick={() =>
                                  handleChildSelect(
                                    {
                                      id: item.parent.id,
                                      title: item.parent.title,
                                    },
                                    {
                                      id: childItem.id,
                                      title: childItem.title,
                                    }
                                  )
                                }
                                className='group cursor-pointer truncate rounded-3xl border border-black border-opacity-30 p-2 px-3 duration-200 hover:bg-neutral-300 dark:border-white hover:dark:bg-gray-800'
                              >
                                {item.parent.title}: {childItem.title}
                                <span className='ml-2 scale-105 text-base text-gray-400 duration-200 group-hover:scale-110 group-hover:text-gray-600'>
                                  X
                                </span>
                              </div>
                            </Tooltip>
                          </div>
                        );
                      });
                    } else {
                      return null;
                    }
                  })}
              </div>
            </div>
            {error.status !== 200 && error.message ? (
              <div className='flex h-[50%] flex-col items-center justify-center'>
                <p>{error.message}</p>
                <button
                  className='mt-2 max-w-[20vw] bg-black py-1 px-3 font-MSB-light text-sm uppercase text-white hover:bg-opacity-70 dark:bg-white dark:text-black'
                  onClick={handleClearFilerValue}
                >
                  Clear filter
                </button>
              </div>
            ) : (
              <WrappedComponent {...props} />
            )}
          </div>
        </section>
        <CharacterDetail />
      </>
    );
  };

  return WithLayoutComponent;
};

export default Gallery;
