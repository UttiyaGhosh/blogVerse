'use client'
import { SearchContext } from '@/contexts/SearchContext';
import { ChangeEvent, useContext } from 'react';

export default function NavbarCenter () {
  const {searchQuery, setSearchQuery} = useContext(SearchContext);

  return (
    <div className='flex w-9/12 justify-between'>
      <div className='mx-4 w-11/12'>
        <input 
        value={searchQuery}
        className='w-full rounded-md p-2 m-2 text-black' 
        type="text" 
        placeholder="Search" 
        onChange={(e)=>setSearchQuery(e.target.value)}/>
      </div>
    </div>
  );
};