import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button, // Import Button component
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function NavList() {
  return (
    <ul className='flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-medium'
      >
        <Link to="/">
          <a
            href='/' // Update href with the correct URL path
            className='flex items-center font-bold transition-colors hover:text-green-500'
          >
            Home
          </a>
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-medium'
      >
        <Link to="/packages">
          <a
            href='/packages' // Update href with the correct URL path
            className='flex items-center font-bold transition-colors hover:text-green-500'
          >
            Packages
          </a>
        </Link>
      </Typography>
      {/* Similar updates for other list items */}
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-medium'
        key={6} // Add a unique key to each list item
      >
        <Link to="/offers">
          <a
            href='/offers' // Update href with the correct URL path
            className='flex items-center font-bold transition-colors hover:text-green-500'
          >
            Offers
          </a>
        </Link>
      </Typography>
    </ul>
  );
}

function MyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Navbar className='sticky top-0 z-50 px-6 py-3 mx-auto bg-white shadow-md my-7'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <img src={logo} alt='' className='h-10 w-25' />
        <div className='hidden lg:flex lg:items-center lg:justify-center lg:block'>
          <NavList />
        </div>
        <div className='flex items-center'>
          <Link to='/sign-in'>
            <Button variant='filled' color='green' className='hidden mr-4 lg:block'>
              Login
            </Button>
          </Link>

          <Link to='/signup'>
            <Button variant='filled' color='green' className='hidden lg:block'>
              Signup
            </Button>
          </Link>

          <IconButton
            variant='text'
            className='w-6 h-6 ml-4 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className='w-6 h-6' strokeWidth={2} />
            ) : (
              <Bars3Icon className='w-6 h-6' strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default MyNavbar;
