import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  // withCredentials: true,
  // credentials: 'same-origin',
  // crossdomain: true,

  // headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  //     'Access-Control-Allow-Credentials': 'true',
  // },
});

const get = (url: string, config?: object) => {
  return axiosInstance.get(url, config);
};

const post = (url: string, data: object, config?: object) => {
  return axiosInstance.post(url, data, config);
};

const put = (url: string, data: object, config?: object) => {
  return axiosInstance.put(url, data, config);
};

const patch = (url: string, data: object, config?: object) => {
  return axiosInstance.patch(url, data, config);
};

const del = (url: string, config?: object) => {
  return axiosInstance.delete(url, config);
};

export { get, post, put, patch, del };
