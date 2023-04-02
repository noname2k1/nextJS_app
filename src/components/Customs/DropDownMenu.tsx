import { HeaderItem } from '@/config/interfaces';
import Tippy from '@tippyjs/react/headless';
import Link from 'next/link';
import React from 'react';

interface Props {
  data: HeaderItem[];
  disabled: boolean;
  onClick?: HeaderItem['onClick'];
  children: JSX.Element;
}

const DropDownMenu = ({ data, disabled = false, onClick, children }: Props) => {
  const renderItem = () => {
    return (
      <div className='rounded-md border border-black/25 bg-white shadow-lg dark:bg-gray-900'>
        {data &&
          data.map((item) => {
            const Wrapper = item.path ? Link : 'div';
            return (
              <Wrapper
                href={item.path ? item.path : ''}
                className='mb-1 flex cursor-pointer items-center p-2 font-mono-regular text-xs uppercase last:mb-0 hover:bg-off-white-b hover:first:rounded-t-lg hover:last:rounded-b-lg dark:hover:bg-gray-700'
                key={item.id}
              >
                <span className='mr-auto'>{item.label && item.label}</span>{' '}
                <span className='ml-2'>{item.rightIcon && item.rightIcon}</span>
              </Wrapper>
            );
          })}
      </div>
    );
  };
  return (
    <div>
      <Tippy
        interactive
        disabled={disabled}
        render={() => renderItem()}
        trigger='click'
      >
        {children}
      </Tippy>
    </div>
  );
};

export default DropDownMenu;
