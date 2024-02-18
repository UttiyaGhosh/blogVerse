import Link from 'next/link';
import NavbarLeft from './NavbarLeft';
import NavbarCenter from './NavbarCenter';
import NavbarRight from './NavbarRight';

export default function Navbar () {
  return (
    <div className='bg-amber-700 text-white flex justify-between'>
        <NavbarLeft/>
        <NavbarCenter/>
        <NavbarRight/>
    </div>
  );
};