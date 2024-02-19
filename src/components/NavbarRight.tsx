import Link from 'next/link';

export default function NavbarRight () {
  return (
    <div className='bg-amber-700 text-white flex justify-between'>
      <div className='mx-4 flex items-center'>
        <Link href="/profile">
          <p>Settings</p>
        </Link>
      </div>
      <div className='mx-4 flex items-center'>
          <Link href="/">
            <p>Logout</p>
          </Link>
      </div>
    </div>
  );
};