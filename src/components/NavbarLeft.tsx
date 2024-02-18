import Link from 'next/link';

export default function NavbarLeft () {
  return (
    <div className='flex my-4'>
      <div className='mx-4  flex items-center'>
        <Link href="/search">
          <p>Home</p>
        </Link>
      </div>
      <div className='mx-4 flex items-center'>
        <Link href="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};