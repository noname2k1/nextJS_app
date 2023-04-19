import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';

interface Props {
  items: any[];
}

const UserTable = ({ items }: Props) => {
  const router = useRouter();
  const pathnameArray = router.pathname.split('/');
  return (
    <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
      {/* thead */}
      <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope='col' className='p-4'>
            <div className='flex items-center'>
              <input
                id='checkbox-all-search'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
              />
              <label htmlFor='checkbox-all-search' className='sr-only'>
                checkbox
              </label>
            </div>
          </th>
          <th scope='col' className='px-6 py-3'>
            Username
          </th>
          <th scope='col' className='px-6 py-3'>
            Role
          </th>
          <th scope='col' className='px-6 py-3 max-md:hidden'>
            Created_at
          </th>
          <th scope='col' className='px-6 py-3 max-md:hidden'>
            Updated_at
          </th>
          <th scope='col' className='px-6 py-3'>
            Action
          </th>
        </tr>
      </thead>
      {/* tbody */}
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
                {pathnameArray[pathnameArray.length - 1] === 'remove' && (
                  <a
                    href='#'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    remove
                  </a>
                )}
                {pathnameArray[pathnameArray.length - 1] === 'list' && (
                  <>
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
                  </>
                )}
                {pathnameArray[pathnameArray.length - 1] === 'trash' && (
                  <>
                    <a
                      href='#'
                      className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Restore
                    </a>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
