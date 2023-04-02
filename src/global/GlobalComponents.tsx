import Connect from '@/components/Connect';
import connectList from '@/datas/connectList';
import React from 'react';

interface Props {}

const GlobalComponents = (props: Props) => {
  return (
    <div>
      <Connect data={connectList} />
    </div>
  );
};

export default GlobalComponents;
