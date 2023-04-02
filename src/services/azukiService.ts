import * as axiosInstance from '@/config/axiosIntances';

const getAzukis = async (page: number = 1, limit: number = 30) => {
  try {
    const response = await axiosInstance.get('/api/v1/azuki', {
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

const getGoldenAzukis = async (page = 1, limit = 30) => {
  try {
    const response = await axiosInstance.get('/api/v1/azuki/golden-mode', {
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

const filterGoldenAzukis = async (filters = {}, page = 1, limit = 30) => {
  try {
    const response = await axiosInstance.post(
      '/api/v1/azuki/golden-mode/get-by-attributes',
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

export {
  getAzukis,
  getGoldenAzukis,
  filterAzukis,
  filterGoldenAzukis,
  getOneAzuki,
};
