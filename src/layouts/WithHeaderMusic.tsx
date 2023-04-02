import Header from '@/components/Header';
import React from 'react';
import { NextPage, NextComponentType, NextPageContext } from 'next';
// import Music from '@/components/Music';

const WithHeaderMusic = <P extends object>(
  WrappedComponent: NextComponentType<NextPageContext, any, P>
) => {
  const WithLayoutComponent: NextPage<P> = (props: P) => {
    return (
      <section className='dark:bg-gray-900'>
        <Header />
        <WrappedComponent {...props} />
      </section>
    );
  };

  return WithLayoutComponent;
};

export default WithHeaderMusic;
