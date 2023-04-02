import React, { useEffect, useState } from 'react';

interface Props {
  className?: string;
  isDark?: boolean;
  size?: 'small' | 'medium';
  checked: boolean;
  onChange: () => void;
  label?: string | JSX.Element;
  checkedBg?: `checked:bg-${string} checked:after:bg-${string} checked:focus:bg-${string}`;
  checkedGolden?: boolean;
  checkedSelfie?: boolean;
}

const Toggle = ({
  className,
  isDark,
  size = 'small',
  checked,
  onChange,
  label,
  checkedBg,
  checkedGolden,
  checkedSelfie,
}: Props) => {
  if (size === 'small')
    return (
      <label
        className={`${
          className ? className : ''
        } relative mr-3 inline-flex cursor-pointer items-center`}
      >
        <input
          type='checkbox'
          className='peer sr-only'
          checked={checked}
          onChange={onChange}
        />
        <div className="peer h-4 w-11 rounded-full bg-black bg-opacity-40 after:absolute after:top-[2px] after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        {label && (
          <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
            {label}
          </span>
        )}
      </label>
    );

  return (
    <div
      className={`${className ? className : ''} ${
        checkedGolden && checked ? 'golden' : 'bg-gray-200'
      } ${
        checkedSelfie && checked
          ? 'selfie hover:cursor-[url("/images/items/bean-mouse-cursor.png"),_pointer]'
          : 'bg-gray-200'
      } relative flex h-4 w-12 justify-center rounded-xl duration-500`}
    >
      <label
        className={`${checked ? 'translate-x-3' : '-translate-x-3.5'} ${
          checkedGolden && checked ? 'golden' : ''
        } ${
          checkedSelfie && checked
            ? 'selfie hover:cursor-[url("/images/items/bean-mouse-cursor.png"),_pointer]'
            : ''
        } absolute top-1/2 h-6 w-6  -translate-y-1/2 cursor-pointer rounded-full border border-black/10 bg-white drop-shadow-md duration-300`}
      />
      <input
        type='checkbox'
        className='hidden hover:cursor-[url("/images/items/bean-mouse-cursor.png"),_pointer]'
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default Toggle;
