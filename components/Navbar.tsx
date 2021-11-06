import Image from 'next/image';
import Search from '@components/inputs/Search';
import { Badge } from '@material-ui/core';

const Navbar = () => (
  <div className='flex flex-row py-4 padding-screen space-x-4 justify-center md:justify-between items-center border-b'>
    <button type='button' className='w-12 h-12 md:w-16 md:h-16 relative'>
      <Image layout='fill' src='/img/logo.png' />
    </button>
    <div className='w-auto md:w-2/5 '>
      <Search />
    </div>
    <div className='hidden md:flex flex-col justify-center w-1/5'>
      <span className='font-bold'>+57 318 447 14 32</span>
      <span className='font-light'>Soporte 24/7</span>
    </div>
    <div className='flex flex-row justify-between items-center space-x-4 md:space-x-8'>
      <button type='button'>
        <i className='fas fa-user text-2xl md:text-xl text-black' />
      </button>
      <button type='button'>
        <i className='fas fa-heart text-2xl md:text-xl text-black md:block hidden' />
      </button>
      <button type='button'>
        <Badge badgeContent={4} color='primary'>
          <i className='fas fa-shopping-cart text-2xl md:text-xl text-black' />
        </Badge>
      </button>
      <div className='md:flex md:flex-col hidden'>
        <span className='font-semibold text-text'>Tu carrito</span>
        <span className='font-bold'>$30.000</span>
      </div>
    </div>
  </div>
);

export default Navbar;
