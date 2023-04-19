import * as axiosInstance from '@/config/axiosIntances';
import * as withAuthMultipartFormData from '@/config/withAuthMultipartFormData';

const getSongs = async (page: number = 1, limit: number = 30) => {
  try {
    const response = await axiosInstance.get('/api/v1/songs', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const filterAzukis = async (filters = {}, page = 1, limit = 30) => {
  try {
    const response = await axiosInstance.post(
      '/api/v1/azuki/get-by-attributes',
      {
        ...filters,
      },
      {
        params: {
          page,
          limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOneAzuki = async (id: number = 1) => {
  try {
    const response = await axiosInstance.get('/api/v1/azuki/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addSong = async (file: any, name: string, singer: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('singer', singer);
  try {
    const response = await withAuthMultipartFormData.post(
      '/api/v1/admin/songs',
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getSongs, filterAzukis, getOneAzuki, addSong };
