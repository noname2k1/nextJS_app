/* eslint-disable react-hooks/exhaustive-deps */
import { BeanzWhiteLogo, LockIcon, UnlockIcon } from '@/components/Icons';
import pathNames from '@/config/pathNames';
import { login } from '@/services/authService';
import { useAuthStore } from '@/store';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Props {}
type Inputs = {
  username: string;
  password: string;
};

const LoginPage = (props: Props) => {
  const { push } = useRouter();
  const [token, user, setToken, setUser] = useAuthStore((state) => [
    state.token,
    state.user,
    state.setToken,
    state.setUser,
  ]);
  const [lock, setLock] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<Inputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleClearError = () => {
    setError('');
  };

  const handleGoHome = () => {
    push(pathNames.home, undefined);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      // console.log(res);
      setToken(res.access_token);
      setUser(res.data);
      setLock(false);
      setError('');
      setSuccessMsg('Login success');
      setTimeout(() => push(pathNames.manager, undefined), 1500);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const resError = error.response?.data;
        resError.message
          ? setError(resError.message)
          : setError(resError.error);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!dirtyFields.username || !dirtyFields.password || error) {
      setLock(true);
    }
  }, [dirtyFields.username, dirtyFields.password, error]);

  useEffect(() => {
    if (token && ['admin', 'mod'].indexOf(user.role) !== -1) {
      push(pathNames.manager, undefined);
    }
  }, [token, user.role]);

  return (
    <section className='fixed flex h-screen w-screen items-center justify-center bg-black bg-opacity-40'>
      <button
        onClick={handleGoHome}
        className='absolute top-2 left-2 rounded-md bg-red-600 px-3 py-1.5 hover:bg-opacity-60'
      >
        <BeanzWhiteLogo />
      </button>
      <div className='flex h-full w-full flex-col items-center justify-evenly bg-white md:h-3/4 md:w-5/6 md:rounded-lg lg:w-4/6 xl:w-1/2'>
        <div
          className={`${
            lock && !errors.username && !errors.password
              ? 'text-blue-600'
              : 'text-green-600'
          } ${
            lock && (errors.username || errors.password || error)
              ? 'text-red-600'
              : ''
          } mx-auto flex h-1/3 items-center justify-center duration-300`}
        >
          <div className='relative rounded-full bg-black text-9xl'>
            {lock ? <LockIcon /> : <UnlockIcon />}
            <div
              className={`${
                dirtyFields.username
                  ? 'left-0 opacity-100'
                  : '-left-1/2 opacity-0'
              } ${
                error || errors.username || errors.password
                  ? 'border-red-600'
                  : lock
                  ? 'border-blue-600'
                  : 'border-green-600'
              }
               absolute top-0 h-full w-1/2 rounded-l-full border-l-8 border-t-8 border-b-8 duration-300`}
            ></div>
            <div
              className={`${
                dirtyFields.password
                  ? 'right-0 opacity-100'
                  : '-right-1/2 opacity-0'
              } ${
                error || errors.username || errors.password
                  ? 'border-red-600'
                  : lock
                  ? 'border-blue-600'
                  : 'border-green-600'
              } absolute top-0 h-full w-1/2 rounded-r-full border-r-8 border-t-8 border-b-8 duration-300`}
            ></div>
            <div
              className={`${
                dirtyFields.username && dirtyFields.password
                  ? 'opacity-100'
                  : 'opacity-0'
              } ${
                loading &&
                dirtyFields.username &&
                dirtyFields.password &&
                'animate-circular bg-gradient-to-r from-indigo-500'
              } absolute top-0 right-0 h-full w-full rounded-full duration-300`}
            ></div>
          </div>
        </div>
        {/* error list */}
        {(error || errors.username || errors.password || successMsg) && (
          <div className=''>
            <ul className='flex flex-col gap-2 border border-black/20 p-3'>
              {error && <li className='text-red-600'>{error}</li>}
              {errors.username && (
                <li className='text-red-600'>{errors.username.message}</li>
              )}
              {errors.password && (
                <li className='text-red-600'>{errors.password.message}</li>
              )}
              {successMsg && <li className='text-green-600'>{successMsg}</li>}
            </ul>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mb-10 flex items-center justify-center gap-3 max-[565px]:flex-col'
        >
          <div className='border border-black/10'>
            <input
              type='text'
              placeholder='username'
              className='p-2 outline-none'
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required',
                },
              })}
              onFocus={handleClearError}
            />
          </div>
          <div className='border border-black/10'>
            <input
              type='password'
              placeholder='password'
              className='p-2 outline-none'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
              onFocus={handleClearError}
            />{' '}
          </div>
          <div className='flex items-center justify-center'>
            <button className='dark:hover:bg-white/hover:bg-black/75 border border-black/10 bg-white px-4 py-2 font-mono-light font-black uppercase text-black hover:bg-black/75 hover:text-white dark:bg-gray-900 dark:text-white dark:hover:text-black '>
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
