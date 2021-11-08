import React from 'react';

interface SearchInterface {
  classNameContainer?: string;
}

const Search = ({ classNameContainer = '' }: SearchInterface) => (
  <div
    className={`flex flex-row items-center rounded-md ${classNameContainer}`}
  >
    <div className='hidden md:block rounded-l-md p-2 border bg-inputSearch'>
      <i className='fas fa-search text-text' />
    </div>
    <input
      type='search'
      id='search'
      className='rounded-r-md p-2 bg-inputSearch text-text border focus:outline-none w-full'
      placeholder='Buscar productos...'
    />
  </div>
);

export default Search;
