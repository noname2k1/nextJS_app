import Header from '@/components/partials/Header';
import React from 'react';
import { NextPage, NextComponentType, NextPageContext } from 'next';

const WithHeaderHover = <P extends object>(
  WrappedComponent: NextComponentType<NextPageContext, any, P>
) => {
  const WithLayoutComponent: NextPage<P> = (props: P) => {
    return (
      <section className='relative h-screen w-screen'>
        <Header
          className='z-50 opacity-0 duration-1000 hover:opacity-100'
          isDark={false}
        />
        <WrappedComponent {...props} />
      </section>
    );
  };

  return WithLayoutComponent;
};

export default WithHeaderHover;
