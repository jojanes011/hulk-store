import Image from 'next/image';
import Search from '@components/inputs/Search';
import { Badge } from '@material-ui/core';
import { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { CartContext } from 'context/cart';

const Navbar = () => {
  const router = useRouter();
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openAdmin = Boolean(anchorElAdmin);
  const openUser = Boolean(anchorElUser);
  const { cartState } = useContext(CartContext);

  const handleClickAdmin = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseAdmin = () => {
    setAnchorElAdmin(null);
  };

  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const getTotal = (): number => {
    const total = cartState.reduce((prev, curr) => prev + curr.price, 0);
    return total;
  };

  return (
    <div className='flex flex-row py-4 padding-screen space-x-4 justify-center md:justify-between items-center border-b'>
      <button
        type='button'
        onClick={() => router.push('/')}
        className='w-12 h-12 md:w-16 md:h-16 relative'
      >
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
        <button
          type='button'
          id='basic-button-admin'
          aria-controls='basic-menu'
          aria-haspopup='true'
          aria-expanded={openAdmin ? 'true' : undefined}
          onClick={handleClickAdmin}
        >
          <i className='fas fa-toolbox text-2xl md:text-xl text-black' />
        </button>
        <Menu
          id='basic-menu-admin'
          anchorEl={anchorElAdmin}
          open={openAdmin}
          onClose={handleCloseAdmin}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => router.push('/admin/inventory')}>
            Inventario
          </MenuItem>
          <MenuItem onClick={() => router.push('/admin/users')}>
            Usuarios
          </MenuItem>
        </Menu>
        <button
          type='button'
          id='basic-button-user'
          aria-controls='basic-menu'
          aria-haspopup='true'
          aria-expanded={openUser ? 'true' : undefined}
          onClick={handleClickUser}
        >
          <i className='fas fa-users text-2xl md:text-xl text-black' />
        </button>
        <Menu
          id='basic-menu-user'
          anchorEl={anchorElUser}
          open={openUser}
          onClose={handleCloseUser}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => router.push('/profile')}>Perfil</MenuItem>
          <MenuItem onClick={() => signOut()}>Cerrar sesión</MenuItem>
        </Menu>
        <button type='button' onClick={() => router.push('/cart')}>
          <Badge badgeContent={cartState?.length} color='primary'>
            <i className='animate-bounce fas fa-shopping-cart text-2xl md:text-xl text-black' />
          </Badge>
        </button>
        <div className='md:flex md:flex-col hidden'>
          <span className='font-semibold text-text'>Tu carrito</span>
          <span className='font-bold'>
            $ {new Intl.NumberFormat('de-DE').format(getTotal())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
