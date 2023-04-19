/* eslint-disable react-hooks/exhaustive-deps */
import { FormInput } from '@/components/Customs/form/molecules/FormInput';
import { addUser } from '@/services/adminService';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
interface Props {}

export type RegistrationFormFields = {
  username: string;
  password: string;
  role: string;
};

const schema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
  role: yup.string().required('role is required'),
});

const AddUser = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormFields>({
    resolver: yupResolver(schema),
  });

  const [preview, setPreview] = useState('');

  const resetForm = () => {
    reset();
    URL.revokeObjectURL(preview);
    setPreview('');
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await addUser(data);
      toast.success('add user successful');
      resetForm();
    } catch (error: any) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else
        toast.error(
          'add user failed, please check your internet connection and try again'
        );
    }
  });

  //   React.useEffect(() => {
  //     const subscription = watch((value, { name }) => {
  //       if (name === 'file' && value.file) {
  //         const file = value.file[0];
  //         if (file) {
  //           //   console.log(file);
  //           setPreview(URL.createObjectURL(file));
  //           setValue('name', file.name.split('.')[0]);
  //         } else {
  //           resetForm();
  //         }
  //       }
  //     });
  //     return () => subscription.unsubscribe();
  //   }, [watch]);

  return (
    <form onSubmit={onSubmit}>
      {/* <div className='flex w-full flex-col items-center justify-center'>
        <label
          htmlFor='dropzone-file'
          className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              aria-hidden='true'
              className='mb-3 h-10 w-10 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              audio file
            </p>
          </div>
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            accept='audio/*'
            {...register('file')}
          />
        </label>
        {preview && (
          <audio src={preview} controls className='mt-4 w-full outline-none' />
        )}
        {errors.file?.message && (
          <p className='mt-1 w-full text-red-600'>{errors.file?.message}</p>
        )}
      </div> */}
      <div className='my-6 grid gap-6 md:grid-cols-2'>
        <div>
          <label
            htmlFor='username'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            username
          </label>
          <FormInput
            type='text'
            id='username'
            name='username'
            placeholder='username'
            autoComplete='off'
            label='username'
            register={register}
            rules={{ required: 'username is required' }}
            errors={errors}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            password
          </label>
          <FormInput
            type='text'
            id='password'
            name='password'
            placeholder='password'
            autoComplete='off'
            label='password'
            register={register}
            rules={{ required: 'password is required' }}
            errors={errors}
          />
        </div>
        <div className=''>
          <label
            htmlFor='roles'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            Select an option
          </label>
          <select
            id='roles'
            {...register('role')}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          >
            <option selected value='user'>
              Choose a role
            </option>
            <option value='user'>user</option>
            <option value='mod'>mod</option>
            <option value='admin'>admin</option>
          </select>
        </div>
      </div>
      <button
        className='mt-2 transform rounded bg-blue-500 py-2 px-4 font-semibold text-white shadow-md duration-200 focus:translate-y-1 focus:outline-none disabled:opacity-50 hover:-translate-y-1 hover:bg-blue-600 disabled:hover:translate-y-0 disabled:hover:bg-blue-500'
        type='submit'
        // disabled
      >
        Submit
      </button>
    </form>
  );
};

export default AddUser;
