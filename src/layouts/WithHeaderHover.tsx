import Header from '@/components/Header';
import React from 'react';
import { NextPage, NextComponentType, NextPageContext } from 'next';
import Music from '@/components/Music';

const WithHeaderHover = <P extends object>(
  WrappedComponent: NextComponentType<NextPageContext, any, P>
) => {
  const WithLayoutComponent: NextPage<P> = (props: P) => {
    return (
      <section className="relative w-screen h-screen">
        <Header
          className="opacity-0 hover:opacity-100 duration-1000 z-50"
          isDark={false}
        />
        <WrappedComponent {...props} />
      </section>
    );
  };

  return WithLayoutComponent;
};

export default WithHeaderHover;
