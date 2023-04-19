import categories from '@/datas/admin/constants';
import CharTable from '@/datas/admin/table/CharTable';
import SongTable from '@/datas/admin/table/SongTable';
import UserTable from '@/datas/admin/table/UserTable';
import AdminLayout from '@/layouts/admin';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const RemovePage = (props: Props) => {
  const {
    query: { category },
  } = useRouter();
  console.log(category);
  return (
    <AdminLayout>
      <>
        {[categories.azuki, categories.beanz].includes(category as string) && (
          <>
            <CharTable items={[]} />
          </>
        )}
        {categories.song === category && (
          <>
            <SongTable items={[]} />
          </>
        )}
        {categories.user === category && (
          <>
            <UserTable items={[]} />
          </>
        )}
      </>
    </AdminLayout>
  );
};

export default RemovePage;
