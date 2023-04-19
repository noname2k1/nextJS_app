const CharacterTableHeader = () => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='p-4'>
          <div className='flex items-center'>
            <input
              id='checkbox-all-search'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
            />
            <label htmlFor='checkbox-all-search' className='sr-only'>
              checkbox
            </label>
          </div>
        </th>
        <th scope='col' className='px-6 py-3'>
          Name
        </th>
        <th scope='col' className='px-6 py-3'>
          Image
        </th>
        <th scope='col' className='px-6 py-3'>
          Attributes
        </th>
        <th scope='col' className='px-6 py-3 max-md:hidden'>
          Created_at
        </th>
        <th scope='col' className='px-6 py-3 max-md:hidden'>
          Updated_at
        </th>
        <th scope='col' className='px-6 py-3'>
          Action
        </th>
      </tr>
    </thead>
  );
};

const SongTableHeader = () => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='p-4'>
          <div className='flex items-center'>
            <input
              id='checkbox-all-search'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
            />
            <label htmlFor='checkbox-all-search' className='sr-only'>
              checkbox
            </label>
          </div>
        </th>
        <th scope='col' className='px-6 py-3'>
          Name
        </th>
        <th scope='col' className='px-6 py-3'>
          Src
        </th>
        <th scope='col' className='px-6 py-3'>
          singer
        </th>
        <th scope='col' className='px-6 py-3 max-md:hidden'>
          Created_at
        </th>
        <th scope='col' className='px-6 py-3 max-md:hidden'>
          Updated_at
        </th>
        <th scope='col' className='px-6 py-3'>
          Action
        </th>
      </tr>
    </thead>
  );
};

const UserTableHeader = () => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='p-4'>
          <div className='flex items-center'>
            <input
              id='checkbox-all-search'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
            />
            <label htmlFor='checkbox-all-search' className='sr-only'>
              checkbox
            </label>
          </div>
        </th>
        <th scope='col' className='px-6 py-3'>
          Username
        </th>
        <th scope='col' className='px-6 py-3'>
          Role
        </th>
        <th scope='col' className='px-6 py-3 max-md:hidden'>
          Created_at
        </th>
        <th scope='col' className='px-6 py-3 max-md:hidden'>
          Updated_at
        </th>
        <th scope='col' className='px-6 py-3'>
          Action
        </th>
      </tr>
    </thead>
  );
};

export { CharacterTableHeader, SongTableHeader, UserTableHeader };
