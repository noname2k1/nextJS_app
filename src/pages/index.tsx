import React, { useEffect } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { appConstants } from '@/config/constants';
import WithHeaderMusic from '@/layouts/WithHeaderMusic';
const cx = classNames.bind(styles);

interface Props {}

const Index = (props: Props) => {
  return (
    <div className={cx('container')}>
      <video
        className={cx('video-bg')}
        src='/videos/pc-bg.mp4'
        loop
        autoPlay
        muted
      />
      <Image
        src='/images/loading-bg-mobile.jpg'
        alt={appConstants.alt}
        className={cx('image-cover')}
        fill
      ></Image>
    </div>
  );
};

export default WithHeaderMusic(Index);
