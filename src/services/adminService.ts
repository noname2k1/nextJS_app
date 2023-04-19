import * as withAuthInstance from '@/config/withAuthInstance';
import withAuthMultipartFormData from '@/config/withAuthMultipartFormData';

const getCounts = async () => {
  try {
    const res = await withAuthInstance.get('/api/v1/admin/count');
    return res.data;
  } catch (error) {
    throw error;
  }
};

const addUser = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  try {
    const res = await withAuthInstance.post('/api/v1/admin/users', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getUsers = async (page = 1, limit = 30) => {
  try {
    const res = await withAuthInstance.get('/api/v1/admin/users', {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const addCharacter = async (
  character: string,
  data: {
    name: string;
    attributes: string;
    image: any;
  }
) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('attributes', data.attributes);
  formData.append('image', data.image[0]);
  try {
    const res = await withAuthMultipartFormData.post(
      '/api/v1/admin/' + character,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getCounts, getUsers, addUser, addCharacter };
