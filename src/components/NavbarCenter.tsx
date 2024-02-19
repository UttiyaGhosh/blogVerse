'use client'
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

export default function NavbarCenter () {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const searchKey = e.target.value
    setSearchQuery(searchKey)
    if(searchKey.length>=3)
      console.log(searchKey)
  }

  return (
    <div className='flex w-9/12 justify-between'>
      <div className='mx-4 w-4/5'>
        <input 
        value={searchQuery}
        className='w-full rounded-md p-2 m-2 text-black' 
        type="text" 
        placeholder="Search" 
        onChange={handleChange}/>
      </div>
      <div className='mx-4 flex items-center'>
        <Link href="/new-post">
          <p>New Post</p>
        </Link>
      </div>
    </div>
  );
};