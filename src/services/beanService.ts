import * as axiosInstance from '@/config/axiosIntances';

const getBeans = async (page: number = 1, limit: number = 30) => {
  try {
    const response = await axiosInstance.get('/api/v1/bean', {
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

const getOneBean = async (id: number = 1) => {
  try {
    const response = await axiosInstance.get('/api/v1/bean/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const filterBean = async (filters = {}, page = 1, limit = 30) => {
  try {
    const response = await axiosInstance.post(
      '/api/v1/bean/get-by-attributes',
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

export { getBeans, getOneBean, filterBean };
