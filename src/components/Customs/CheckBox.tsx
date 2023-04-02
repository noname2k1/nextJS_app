import React from 'react';

interface Props {
  size?: number | string;
  checked: boolean;
  onChange: () => void;
  checkedBG?: string;
  id: string;
  className?: string;
}

const CheckBox = ({
  size = 4,
  checked,
  onChange,
  checkedBG = 'bg-red-bean',
  id,
  className,
}: Props) => {
  return (
    <div
      className={`${
        className ? className : ''
      } w-${size} h-${size} relative rounded-[4px] border ${
        checked ? 'border-' : 'border-gray-400'
      }
      `}
    >
      <input
        type='checkbox'
        name=''
        className='hidden'
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label
        htmlFor={id}
        className={`${
          checked && checkedBG ? checkedBG : ''
        } absolute inset-0 rounded-[4px]`}
      ></label>
    </div>
  );
};

export default CheckBox;
