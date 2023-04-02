/* eslint-disable react-hooks/exhaustive-deps */
import { appConstants } from '@/config/constants';
import { Azuki } from '@/config/interfaces';
import Gallery from '@/layouts/Gallery';
import {
  filterAzukis,
  filterGoldenAzukis,
  getAzukis,
  getGoldenAzukis,
} from '@/services/azukiService';
import { useGalleryStore } from '@/store';
import useGlobalStore from '@/store/GlobalStore';
import { convertToTitleCase } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

interface Props {
  charInfo: {
    data: Azuki[];
    count: number;
  };
}

const GalleryPage = ({ charInfo }: Props) => {
  // zustand
  const [
    items,
    filterValue,
    childsSelected,
    sumOfAttrSelected,
    charListFilter,
    page,
    setItems,
    setFilterValue,
    setChildsSelected,
    setSumOfAttrSelected,
    setCharListFilter,
    setCount,
    setPage,
  ] = useGalleryStore((state) => [
    state.items,
    state.filterValue,
    state.childsSelected,
    state.sumOfAttrSelected,
    state.charListFilter,
    state.page,
    state.setItems,
    state.setFilterValue,
    state.setChildsSelected,
    state.setSumOfAttrSelected,
    state.setCharListFilter,
    state.setCount,
    state.setPage,
  ]);

  const [darkMode, setDarkMode] = useGlobalStore((state) => [
    state.darkMode,
    state.setDarkMode,
  ]);

  const [charList, setcharList] = useState<Azuki[]>([]);

  const router = useRouter();

  const handleCharacterDetail = (id: string) => {
    router.push('?id=' + id, undefined, { shallow: true });
  };

  useEffect(() => {
    if (
      charInfo.data &&
      charInfo.data.length > 0 &&
      charListFilter.length <= 0 &&
      !darkMode
    ) {
      setPage(1);
      setItems(charInfo.data);
      setcharList(charInfo.data);
      setCount(charInfo.count);
    }
  }, [charInfo.data, charListFilter, darkMode]);

  useEffect(() => {
    if (items.length > 0 && charListFilter.length <= 0) {
      setcharList(items);
    }
  }, [items, charListFilter]);

  useEffect(() => {
    if (charListFilter.length > 0) {
      setcharList(charListFilter);
    }
  }, [charListFilter]);

  useEffect(() => {
    if (darkMode && sumOfAttrSelected === 0) {
      setPage(1);
      const getGoldenItems = async () => {
        try {
          const res = await getGoldenAzukis();
          if (res.success) {
            setItems(res.data);
            setcharList(res.data);
            setCount(res.count);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getGoldenItems();
    }
  }, [darkMode, sumOfAttrSelected]);

  useEffect(() => {
    if (sumOfAttrSelected <= 0) {
      setCharListFilter([]);
      setChildsSelected([]);
    }
    setChildsSelected(
      childsSelected.filter((item) => item.childrens.length > 0)
    );

    if (sumOfAttrSelected > 0) {
      const getItemsByAttributes = async () => {
        try {
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
          let response;
          if (darkMode) {
            response = await filterGoldenAzukis(attributes);
          } else {
            response = await filterAzukis(attributes);
          }
          if (response.success) {
            setCharListFilter(response.data);
            setCount(response.count);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getItemsByAttributes();
    }
  }, [sumOfAttrSelected]);

  useEffect(() => {
    if (page > 1) {
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
      const loadmoreGoldenAzukis = async () => {
        try {
          const res = await getGoldenAzukis(page);
          setItems([...charList, ...res.data]);
        } catch (error) {
          console.log(error);
        }
      };

      const loadmoreGoldenAzukisWithAttributes = async () => {
        try {
          const res = await filterGoldenAzukis(attributes, page);
          setCharListFilter([...charList, ...res.data]);
        } catch (error) {
          console.log(error);
        }
      };
      const loadmoreAzukis = async () => {
        try {
          const res = await getAzukis(page);
          setItems([...charList, ...res.data]);
        } catch (error) {
          console.log(error);
        }
      };
      const loadmoreAzukisWithAttributes = async () => {
        try {
          const res = await filterAzukis(attributes, page);
          setCharListFilter([...charList, ...res.data]);
        } catch (error) {
          console.log(error);
        }
      };
      if (darkMode) {
        if (sumOfAttrSelected > 0) {
          loadmoreGoldenAzukisWithAttributes();
        } else {
          loadmoreGoldenAzukis();
        }
      } else {
        if (sumOfAttrSelected > 0) {
          loadmoreAzukisWithAttributes();
        } else loadmoreAzukis();
      }
    }
  }, [page]);

  return (
    <div>
      <div className='grid grid-flow-row grid-cols-2 gap-6 overflow-y-auto lg:grid-cols-4 lg:gap-4 xl:grid-cols-5'>
        {charList.length > 0 &&
          charList.map((char, index) => {
            const [type, num] = char.name.split(' #');
            return (
              <InView
                as='div'
                key={char._id}
                id={index.toString()}
                onChange={(inView, entry) => {
                  if (inView) {
                    const id = entry?.target.id;
                    if (Number.parseInt(id) === page * 20) {
                      setPage(page + 1);
                    }
                  }
                }}
              >
                <div
                  key={char._id}
                  className='group flex cursor-pointer flex-col items-center text-black dark:text-white'
                  onClick={() => handleCharacterDetail(num)}
                >
                  <div className='shadow-me h-auto w-[calc(100%-10px)] overflow-hidden rounded-xl duration-200 group-hover:scale-[1.02] group-hover:rounded-2xl'>
                    <Image
                      alt={appConstants.alt}
                      width={200}
                      height={200}
                      src={char.image}
                      className='h-full w-full rounded-md object-cover'
                      loading='lazy'
                    />
                  </div>
                  <h3 className='mt-4 font-mono-light text-xs font-semibold uppercase opacity-60'>
                    {type}
                  </h3>
                  <p className='font-KFA font-thin uppercase tracking-widest dark:text-gold'>
                    No. {num}
                  </p>
                </div>
              </InView>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery(GalleryPage);

export async function getStaticProps() {
  const charInfo = await getAzukis();
  return {
    props: {
      charInfo,
    },
  };
}
