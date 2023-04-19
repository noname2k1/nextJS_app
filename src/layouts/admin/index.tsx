/* eslint-disable react-hooks/exhaustive-deps */
import AdminNavbar from '@/components/partials/admin/Navbar';
import withAuthInstance from '@/config/withAuthInstance';
import withAuthMultipartFormData from '@/config/withAuthMultipartFormData';
import { useAuthStore } from '@/store';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  children: JSX.Element | string;
}

const AdminLayout = ({ children }: Props) => {
  const [token, user] = useAuthStore((state) => [state.token, state.user]);
  const router = useRouter();
  const listPathName = router.pathname.split('/');
  const mainTitle =
    listPathName[listPathName.length - 1] !== 'administrator'
      ? listPathName[listPathName.length - 1]
      : 'General';
  const { category } = router.query;

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      router.push('/administrator/login', undefined);
    }
    if (token) {
      withAuthInstance.defaults.headers.Authorization = `Bearer ${token}`;
      withAuthMultipartFormData.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete withAuthInstance.defaults.headers.Authorization;
      delete withAuthMultipartFormData.defaults.headers.Authorization;
    }
  }, [token, user.role]);

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <section className='flex select-none'>
        <AdminNavbar />
        <div className='mt-12 flex-1 p-2 min-[980px]:mt-0'>
          <h1 className='py-2 text-3xl uppercase'>
            {mainTitle}
            {category && ': ' + category}
          </h1>
          {children}
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
