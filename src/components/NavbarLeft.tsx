import Link from 'next/link';

export default function NavbarLeft () {
  return (
    <div className='flex my-4'>
      <div className='mx-4  flex items-center'>
        <Link href="/view-blogs">
          <p>Home</p>
        </Link>
      </div>
      <div className='mx-4 flex items-center'>
        <Link href="/my-blog">
          <p>My Blogs</p>
        </Link>
      </div>
    </div>
  );
};