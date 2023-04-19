/* eslint-disable react-hooks/exhaustive-deps */
import { FormInput } from '@/components/Customs/form/molecules/FormInput';
import { FormTextarea } from '@/components/Customs/form/molecules/FormTextarea';
import { appConstants } from '@/config/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
interface Props {}

export type RegistrationFormFields = {
  name: string;
  attributes: string;
  image: FileList;
};

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  attributes: yup.string().required('attributes is required'),
  image: yup
    .mixed<File[]>()
    .test('type', 'We only support image file', (value) => {
      return value && value[0]?.type.includes('image');
    }),
});

const AddCharacter = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
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
      //   const res = await addUser(data);
      toast.success('add character successful');
      resetForm();
    } catch (error: any) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else
        toast.error(
          'add character failed, please check your internet connection and try again'
        );
    }
  });

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'image' && value.image) {
        const file = value.image[0];
        if (file) {
          //   console.log(file);
          setPreview(URL.createObjectURL(file));
        } else {
          resetForm();
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={onSubmit}>
      <div className='flex w-full flex-col items-center justify-center'>
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
              image file
            </p>
          </div>
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            accept='image/*'
            {...register('image')}
          />
        </label>
        {preview && !errors.image && (
          <Image
            src={preview}
            alt={appConstants.alt}
            className='h-28 w-28 object-contain'
            width={500}
            height={500}
            onError={() =>
              setError('image', {
                type: 'custom',
                message: 'We only support image file',
              })
            }
          />
        )}
        {errors.image?.message && (
          <p className='mt-1 w-full text-red-600'>{errors.image?.message}</p>
        )}
      </div>
      <div className='my-6 grid gap-6 md:grid-cols-2'>
        <div>
          <label
            htmlFor='name'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            name
          </label>
          <FormInput
            type='text'
            id='name'
            name='name'
            placeholder='name'
            autoComplete='off'
            label='name'
            register={register}
            rules={{ required: 'name is required' }}
            errors={errors}
          />
        </div>
        <div>
          <label
            htmlFor='attributes'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            attributes
          </label>
          <FormTextarea
            id='attributes'
            name='attributes'
            placeholder='attributes'
            autoComplete='off'
            label='attributes'
            register={register}
            rules={{ required: 'attributes is required' }}
            errors={errors}
            style={{
              height: '25vh',
            }}
          />
        </div>
        {/* <div className=''>
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
        </div> */}
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

export default AddCharacter;
