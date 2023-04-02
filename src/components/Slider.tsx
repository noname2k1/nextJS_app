import { appConstants } from '@/config/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

interface Props {
  data: any[];
  bg: string;
}

export default function SlideShow({ data, bg }: Props) {
  const router = useRouter();
  const pathname = router.pathname;
  const type = pathname.includes('gallery/beanz') ? 'Beanz' : 'Azuki';
  return (
    <div className='lg:hidden'>
      <Slider {...settings}>
        {data.map((item, index) => {
          const [attr, value] = item;
          return (
            <div className='overflow-hidden rounded-md' key={index}>
              <div className='flex items-center rounded-md bg-white bg-opacity-10 p-3 font-MSB-regular uppercase'>
                {type === 'Beanz' && (
                  <Image
                    width={20}
                    height={20}
                    className='mr-3 h-6 w-6'
                    alt={appConstants.alt}
                    src={`/images/filters/${
                      bg.includes('off-white') ? 'black' : 'white'
                    }/${attr.toLowerCase()}.png`}
                    priority
                  />
                )}
                {type === 'Azuki' && (
                  <Image
                    width={20}
                    height={20}
                    className='mr-3 h-6 w-6'
                    alt={appConstants.alt}
                    src={
                      ['ear', 'eyes', 'hair', 'neck', 'type'].indexOf(
                        attr.toLowerCase()
                      ) === -1
                        ? `/images/filters/${
                            bg.includes('off-white') ? 'black' : 'white'
                          }/${attr.toLowerCase()}.png`
                        : `/images/filters/${
                            bg.includes('off-white') ? 'black' : 'white'
                          }/azuki/${attr.toLowerCase()}.png`
                    }
                    priority
                  />
                )}
                <div className='flex w-[100%] flex-col'>
                  <div className='text-[10px]'>{attr}</div>
                  <div className='max-w-[98%] truncate text-[11px] font-black'>
                    {value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

// export default Slider;
