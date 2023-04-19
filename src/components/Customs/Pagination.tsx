import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';

interface Props {
  perpage: number;
  total: number;
}

const Pagination = ({ perpage = 30, total }: Props) => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const lastPage = Math.ceil(total / perpage);

  const pagesArray = [];

  for (let i = 2; i <= lastPage - 1; i++) {
    pagesArray.push(i);
  }

  //   console.log(router);
  const handlePage = (e: MouseEvent, newPage: string | number) => {
    if (newPage == page) {
      e.preventDefault();
      return;
    }
    const url = router.asPath.includes('&page=')
      ? router.asPath.split('&page=')[0]
      : router.asPath;
    router.push(`${url}&page=${newPage}`, undefined);
  };
  return (
    <div className='flex items-center justify-center p-2'>
      {/* left arrow */}
      {+page > 1 && (
        <button
          onClick={(e) => handlePage(e, +page - 1)}
          className='mx-1 font-black uppercase'
        >
          &lt;
        </button>
      )}
      {/* page 1 */}
      <button
        onClick={(e) => handlePage(e, 1)}
        className={`${
          page == 1
            ? 'cursor-default bg-blue-700'
            : 'bg-gray-700 hover:bg-gray-500'
        } mx-1 rounded-md p-2 font-black uppercase text-white`}
      >
        1
      </button>
      {page == 1 && (
        <>
          <button
            onClick={(e) => handlePage(e, 2)}
            className='mx-1 rounded-md bg-gray-700 p-2 font-black uppercase text-white hover:bg-gray-500'
          >
            {2}
          </button>
          <button
            onClick={(e) => handlePage(e, 3)}
            className='mx-1 rounded-md bg-gray-700 p-2 font-black uppercase text-white hover:bg-gray-500'
          >
            {3}
          </button>
          ...
        </>
      )}
      {pagesArray.indexOf(+page) !== -1 && (
        <>
          {+page > 2 && (
            <>
              {+page > 3 && <>...</>}
              <button
                onClick={(e) => handlePage(e, +page - 1)}
                className={`${
                  page == +page - 1
                    ? 'cursor-default bg-blue-700'
                    : 'bg-gray-700 hover:bg-gray-500'
                } mx-1 rounded-md p-2 font-black uppercase text-white`}
              >
                {+page - 1}
              </button>
            </>
          )}
          <button
            onClick={(e) => handlePage(e, +page)}
            className={`${
              page == page
                ? 'cursor-default bg-blue-700'
                : 'bg-gray-700 hover:bg-gray-500'
            } mx-1 rounded-md p-2 font-black uppercase text-white`}
          >
            {page}
          </button>
          {+page < lastPage - 1 && (
            <>
              <button
                onClick={(e) => handlePage(e, +page + 1)}
                className={`${
                  page == +page - 1
                    ? 'cursor-default bg-blue-700'
                    : 'bg-gray-700 hover:bg-gray-500'
                } mx-1 rounded-md p-2 font-black uppercase text-white`}
              >
                {+page + 1}
              </button>
              {+page < lastPage - 2 && <>...</>}
            </>
          )}
        </>
      )}
      {/* last page */}
      {page == lastPage && (
        <>
          ...
          <button
            onClick={(e) => handlePage(e, lastPage - 2)}
            className='mx-1 rounded-md bg-gray-700 p-2 font-black uppercase text-white hover:bg-gray-500'
          >
            {lastPage - 2}
          </button>
          <button
            onClick={(e) => handlePage(e, lastPage - 1)}
            className='mx-1 rounded-md bg-gray-700 p-2 font-black uppercase text-white hover:bg-gray-500'
          >
            {lastPage - 1}
          </button>
        </>
      )}
      <button
        onClick={(e) => handlePage(e, lastPage)}
        className={`${
          page == lastPage
            ? 'cursor-default bg-blue-700'
            : 'bg-gray-700 hover:bg-gray-500'
        } mx-1 cursor-default rounded-md p-2 font-black uppercase text-white`}
      >
        {lastPage}
      </button>
      {/* right arrow */}
      {+page < lastPage && (
        <button
          onClick={(e) => handlePage(e, +page + 1)}
          className='mx-1 font-black uppercase'
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
