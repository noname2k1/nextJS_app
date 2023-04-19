import AddCharacter from '@/components/admin/new/AddCharacter';
import AddUser from '@/components/admin/new/AddUser';
import UploadSong from '@/components/admin/new/UploadSong';
import categories from '@/datas/admin/constants';
import AdminLayout from '@/layouts/admin';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const NewPage = (props: Props) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <AdminLayout>
      <div className=''>
        {[categories.azuki, categories.beanz].includes(category as string) && (
          <AddCharacter />
        )}
        {category === categories.song && <UploadSong />}
        {category === categories.user && <AddUser />}
      </div>
    </AdminLayout>
  );
};

export default NewPage;
