import { appConstants } from '@/config/constants';
import Image from 'next/image';
import React from 'react';
import Moment from 'react-moment';

interface Props {
  items: any[];
}

const CharTableBody = ({ items }: Props) => {
  return (
    <tbody>
      {items.map((item: any, index) => {
        return (
          <tr
            key={index}
            className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
          >
            <td className='w-4 p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-table-search-1'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                />
                <label htmlFor='checkbox-table-search-1' className='sr-only'>
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope='row'
              className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
            >
              {item.name}
            </th>
            <td className='px-6 py-4'>
              <Image
                src={item.image}
                alt={appConstants.alt}
                width={100}
                height={100}
                priority
                key={item._id}
                className='rounded-full'
              />
            </td>
            <td className='whitespace-pre-wrap px-6 py-4'>
              <div className='max-w-[200px] break-words'>
                {JSON.stringify(item.attributes)}
              </div>
            </td>
            <td className='px-6 py-4 max-md:hidden'>
              <Moment fromNow>{item.createdAt}</Moment>
            </td>
            <td className='px-6 py-4 max-md:hidden'>
              <Moment fromNow>{item.updatedAt}</Moment>
            </td>
            <td className='px-6 py-4'>
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Edit
              </a>{' '}
              |{' '}
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Trash
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const SongTableBody = ({ items }: Props) => {
  return (
    <tbody>
      {items.map((item: any, index) => {
        return (
          <tr
            key={index}
            className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
          >
            <td className='w-4 p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-table-search-1'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                />
                <label htmlFor='checkbox-table-search-1' className='sr-only'>
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope='row'
              className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
            >
              {item.name}
            </th>
            <td className='whitespace-pre-wrap px-6 py-4'>
              <div className='max-w-[140px] break-words'>{item.src}</div>
            </td>
            <td className='px-6 py-4'>{item.singer}</td>
            <td className='px-6 py-4 max-md:hidden'>
              <Moment fromNow>{item.createdAt}</Moment>
            </td>
            <td className='px-6 py-4 max-md:hidden'>
              <Moment fromNow>{item.updatedAt}</Moment>
            </td>
            <td className='px-6 py-4'>
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Edit
              </a>{' '}
              |{' '}
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Trash
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const UserTableBody = ({ items }: Props) => {
  return (
    <tbody>
      {items.map((item: any, index) => {
        return (
          <tr
            key={index}
            className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
          >
            <td className='w-4 p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-table-search-1'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                />
                <label htmlFor='checkbox-table-search-1' className='sr-only'>
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope='row'
              className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
            >
              {item.username}
            </th>
            <td className='px-6 py-4'>{item.role}</td>
            <td className='px-6 py-4 max-md:hidden'>
              <Moment fromNow>{item.createdAt}</Moment>
            </td>
            <td className='px-6 py-4 max-md:hidden'>
              <Moment fromNow>{item.updatedAt}</Moment>
            </td>
            <td className='px-6 py-4'>
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Edit
              </a>{' '}
              |{' '}
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Trash
              </a>{' '}
              |{' '}
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                RePass
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export { CharTableBody, SongTableBody, UserTableBody };
