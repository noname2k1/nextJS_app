import Pagination from '@/components/Customs/Pagination';
import pathNames from '@/config/pathNames';
import categories from '@/datas/admin/constants';
import CharTable from '@/datas/admin/table/CharTable';
import SongTable from '@/datas/admin/table/SongTable';
import UserTable from '@/datas/admin/table/UserTable';
import AdminLayout from '@/layouts/admin';
import { getUsers } from '@/services/adminService';
import { getAzukis } from '@/services/azukiService';
import { getBeans } from '@/services/beanService';
import { getSongs } from '@/services/songService';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {}

const ListPage = (props: Props) => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const category = router.query.category;
  const [timeFilterEnabled, setTimeFilterEnabled] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const handleEnableTimeFilter = () => {
    setTimeFilterEnabled(!timeFilterEnabled);
  };

  useEffect(() => {
    const fetch = async (target: string) => {
      try {
        if (target === categories.azuki) {
          const res = await getAzukis(+page);
          setItems(res.data);
          setTotal(res.count);
        }
        if (target === categories.beanz) {
          const res = await getBeans(+page);
          setItems(res.data);
          setTotal(res.count);
        }
        if (target === categories.song) {
          const res = await getSongs(+page);
          setItems(res.songs);
          setTotal(res.count);
        }
        if (target === categories.user) {
          const res = await getUsers(+page);
          setItems(res.users);
          setTotal(res.count);
        }
      } catch (error) {
        console.log(error);
        setItems([]);
      }
    };
    if (category === categories.azuki) {
      fetch(categories.azuki);
    }
    if (category === categories.beanz) {
      fetch(categories.beanz);
    }
    if (category === categories.song) {
      fetch(categories.song);
    }
    if (category === categories.user) {
      fetch(categories.user);
    }
  }, [category, page]);

  return (
    <AdminLayout>
      <div className='relative min-h-[40vh] overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex items-center justify-between pb-4'>
          <div>
            <button
              className='relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700'
              onClick={handleEnableTimeFilter}
            >
              <svg
                className='mr-2 h-4 w-4 text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                  clipRule='evenodd'
                />
              </svg>
              Last 30 days
              <svg
                className='ml-2 h-3 w-3'
                aria-hidden='true'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
              {/* Dropdown menu */}
              <div
                className={`${
                  timeFilterEnabled ? 'block' : 'hidden'
                } z-100 absolute top-full left-0 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
                data-popper-reference-hidden
                data-popper-escaped
                data-popper-placement='top'
              >
                <ul
                  className='space-y-1 p-3 pl-2 text-sm text-gray-700 dark:text-gray-200'
                  aria-labelledby='dropdownRadioButton'
                >
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        id='filter-radio-example-1'
                        type='radio'
                        name='filter-radio'
                        className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                      />
                      <label
                        htmlFor='filter-radio-example-1'
                        className='ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Last day
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        defaultChecked
                        id='filter-radio-example-2'
                        type='radio'
                        name='filter-radio'
                        className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                      />
                      <label
                        htmlFor='filter-radio-example-2'
                        className='ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Last 7 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        id='filter-radio-example-3'
                        type='radio'
                        name='filter-radio'
                        className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                      />
                      <label
                        htmlFor='filter-radio-example-3'
                        className='ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Last 30 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        id='filter-radio-example-4'
                        type='radio'
                        name='filter-radio'
                        className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                      />
                      <label
                        htmlFor='filter-radio-example-4'
                        className='ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Last month
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        id='filter-radio-example-5'
                        type='radio'
                        name='filter-radio'
                        className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                      />
                      <label
                        htmlFor='filter-radio-example-5'
                        className='ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Last year
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </button>
          </div>
          <div className='mr-1 flex items-center'>
            <Link
              href={`${pathNames.manager}/new?category=${category}`}
              className='hover:bsg-green-500 mr-2 rounded-sm bg-green-600 px-3 py-1 text-white hover:text-black'
            >
              +
            </Link>
            <Link
              href={`${pathNames.manager}/remove?category=${category}`}
              className='rounded-sm bg-red-600 px-3 py-1 text-white hover:bg-red-500 hover:text-black'
            >
              remove
            </Link>
          </div>
          <div className='relative hidden md:block'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Search for items'
            />
          </div>
        </div>

        {[categories.azuki, categories.beanz].includes(category as string) && (
          <>
            <CharTable items={items} />
          </>
        )}
        {categories.song === category && (
          <>
            <SongTable items={items} />
          </>
        )}
        {categories.user === category && (
          <>
            <UserTable items={items} />
          </>
        )}

        {total > 30 && <Pagination perpage={30} total={total} />}
      </div>
    </AdminLayout>
  );
};

export default ListPage;
