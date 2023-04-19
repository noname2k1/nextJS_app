import { refreshToken } from '@/services/authService';
import { useAuthStore } from '@/store';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const withAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${useAuthStore.getState().token}`,
  },
  withCredentials: true,

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

withAuthInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);

    if (isAxiosError(error)) {
      if (error?.response?.data.statusCode === 401) {
        if (Cookies.get('refresh_token')) {
          try {
            const res = await refreshToken();
            useAuthStore.getState().setToken(res.access_token);
          } catch (error) {
            console.log(error);
          }
        } else {
          useAuthStore.getState().logout();
          Router.push('/administrator/login', undefined);
        }
      }
      return Promise.reject(error);
    }
  }
);

const get = (url: string, config?: object) => {
  return withAuthInstance.get(url, config);
};

const post = (url: string, data: object, config?: object) => {
  return withAuthInstance.post(url, data, config);
};

const put = (url: string, data: object, config?: object) => {
  return withAuthInstance.put(url, data, config);
};

const patch = (url: string, data: object, config?: object) => {
  return withAuthInstance.patch(url, data, config);
};

const del = (url: string, config?: object) => {
  return withAuthInstance.delete(url, config);
};

export { get, post, put, patch, del };
export default withAuthInstance;
