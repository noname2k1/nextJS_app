import '@/global/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Music from '@/components/Music';
import pathNames from '@/config/pathNames';
import GlobalComponents from '@/global/GlobalComponents';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  const pathName = useRouter().pathname;
  const haveMusicBar =
    !pathName.includes(pathNames.alley) &&
    !pathName.includes(pathNames.ruins) &&
    !pathName.includes(pathNames.hilumia) &&
    !pathName.includes(pathNames.manager);

  useEffect(() => {
    document.title = `Azuki clone by ninhnam | ${
      pathName === '/' ? 'HOME' : pathName.toUpperCase().replace('/', ' ')
    }`;
  }, [pathName]);
  return (
    <>
      <Component {...pageProps} />
      {haveMusicBar && <Music />}
      <GlobalComponents />
      <ToastContainer />
    </>
  );
}
