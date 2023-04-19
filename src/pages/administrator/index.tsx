import Counter from '@/components/Customs/Counter';
import Loading from '@/components/Customs/Loading';
import pathNames from '@/config/pathNames';
import withAuthInstance from '@/config/withAuthInstance';
import withAuthMultipartFormData from '@/config/withAuthMultipartFormData';
import AdminLayout from '@/layouts/admin';
import { getCounts } from '@/services/adminService';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {}

const AdminHome = (props: Props) => {
  const { push } = useRouter();
  const [token] = useAuthStore((state) => [state.token]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<{
    [key: string]: number;
    azuki: number;
    beanz: number;
    song: number;
    user: number;
  }>({
    azuki: 0,
    beanz: 0,
    song: 0,
    user: 0,
  });
  const list = [
    { id: 0, title: 'azuki', path: pathNames.manager + '/list?category=azuki' },
    { id: 1, title: 'beanz', path: pathNames.manager + '/list?category=beanz' },
    { id: 2, title: 'song', path: pathNames.manager + '/list?category=song' },
    { id: 3, title: 'user', path: pathNames.manager + '/list?category=user' },
  ];

  const handleDiscover = (path: string) => {
    push(path, undefined);
  };

  useEffect(() => {
    const getAllCounts = async () => {
      try {
        const response = await getCounts();
        // console.log(response.data);
        setCounts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getAllCounts();
      setTimeout(() => setLoading(false), 500);
    } else {
    }
  }, [token]);

  return (
    <AdminLayout>
      <div className=''>
        {loading && (
          <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black'>
            <Loading />
          </div>
        )}
        {list.map((item) => {
          return (
            <div
              key={item.id}
              className='group relative mb-4 h-[30vh] w-full overflow-hidden rounded-md bg-black'
            >
              <div className='absolute right-1 top-1 flex items-center justify-center rounded-md bg-white p-1'>
                <Counter number={counts[item.title]} />
              </div>
              <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono-regular text-3xl uppercase text-white delay-500 duration-500 group-hover:-left-1/2 md:text-5xl lg:text-7xl'>
                {item.title}(s)
                <div className='absolute left-1/2 top-1/2 h-0.5 w-[150%] -translate-x-1/2 -translate-y-1/2 bg-white opacity-0 duration-300 group-hover:opacity-100'></div>
              </h1>
              <div className='invisible absolute bottom-2 -left-[200%] flex w-full items-center justify-between px-3 delay-500 duration-500 group-hover:visible group-hover:left-0'>
                <h2 className='text-md uppercase text-white md:text-xl lg:text-3xl'>
                  {item.title}(s)
                </h2>
                <button
                  onClick={() => handleDiscover(item.path)}
                  className='rounded-md bg-white p-4 py-2 font-semibold text-black duration-200 hover:bg-opacity-50 hover:text-white'
                >
                  Discover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
