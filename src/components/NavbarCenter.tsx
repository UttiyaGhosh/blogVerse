import Link from 'next/link';

export default function NavbarCenter () {
  return (
    <div className='flex w-4/5 justify-between'>
      <div className='mx-4 w-4/5'>
        <input className='w-full rounded-md p-2 m-2' type="text" placeholder="Search" />
      </div>
      <div className='mx-4 flex items-center'>
        <Link href="/new-post">
          <p>New Post</p>
        </Link>
      </div>
    </div>
  );
};