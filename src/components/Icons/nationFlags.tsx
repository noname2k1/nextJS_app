const VietNamFlag = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 30 20'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
    >
      <rect width='30' height='20' fill='#da251d' />
      <polygon
        points='15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85'
        fill='#ff0'
      />
    </svg>
  );
};

const USAFlag = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='1em'
      height='1em'
      viewBox='0 0 7410 3900'
    >
      <rect width='7410' height='3900' fill='#b22234' />
      <path
        d='M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0'
        stroke='#fff'
        strokeWidth='300'
      />
      <rect width='2964' height='2100' fill='#3c3b6e' />
      <g fill='#fff'>
        <g id='s18'>
          <g id='s9'>
            <g id='s5'>
              <g id='s4'>
                <path
                  id='s'
                  d='M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z'
                />
                <use xlinkHref='#s' y='420' />
                <use xlinkHref='#s' y='840' />
                <use xlinkHref='#s' y='1260' />
              </g>
              <use xlinkHref='#s' y='1680' />
            </g>
            <use xlinkHref='#s4' x='247' y='210' />
          </g>
          <use xlinkHref='#s9' x='494' />
        </g>
        <use xlinkHref='#s18' x='988' />
        <use xlinkHref='#s9' x='1976' />
        <use xlinkHref='#s5' x='2470' />
      </g>
    </svg>
  );
};

export { VietNamFlag, USAFlag };
