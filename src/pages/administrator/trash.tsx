import categories from '@/datas/admin/constants';
import AdminLayout from '@/layouts/admin';
import React, { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import CharTable from '@/datas/admin/table/CharTable';
import SongTable from '@/datas/admin/table/SongTable';
import UserTable from '@/datas/admin/table/UserTable';

interface Props {}

const TrashPage = (props: Props) => {
  const router = useRouter();
  const categoriesArray = Object.entries(categories).map((entry) => entry[1]);
  const currentCategory = router.query.category || categories.azuki;
  const handleChangeQuery = (category: string) => {
    router.push({
      pathname: router.pathname,
      query: { category },
    });
  };

  return (
    <AdminLayout>
      <>
        <div className='mb-1 flex items-center'>
          {categoriesArray.map((category) => {
            return (
              <div
                className={classNames('mr-2 rounded-md px-3 py-1 text-white', {
                  'cursor-default bg-gray-900': category === currentCategory,
                  'cursor-pointer bg-gray-500 hover:bg-gray-700':
                    category !== currentCategory,
                })}
                onClick={() => handleChangeQuery(category)}
                key={category}
              >
                <span>{category}</span>
              </div>
            );
          })}
        </div>
        {[categories.azuki, categories.beanz].includes(
          currentCategory as string
        ) && (
          <>
            <CharTable items={[]} />
          </>
        )}
        {categories.song === currentCategory && (
          <>
            <SongTable items={[]} />
          </>
        )}
        {categories.user === currentCategory && (
          <>
            <UserTable items={[]} />
          </>
        )}
      </>
    </AdminLayout>
  );
};

export default TrashPage;
