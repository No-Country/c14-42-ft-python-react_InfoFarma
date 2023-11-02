import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Profile from '../../../Profile/Profile';

function SideMenu() {
  const profile = Profile();
  const user = profile && profile.props.user;

  return (
    <div className='bg-green-100 text-gray-900 relative h-screen w-64 p-4'>
      {/* Logo Div */}
      <div className='logo mb-4 text-2xl flex items-center justify-center'>
        <RxHamburgerMenu className='text-3xl' />
        <h1 className='font-bold ml-2'>Farmacia</h1>
      </div>

      {/* User Div */}
      <div className='flex items-center justify-center text-white flex-col mt-6'>
        <Profile />
        {user && user.picture && (
          <img src={user.picture} alt='Admin Image' className='h-20 w-20 rounded-full' />
        )}
        {user && (
          <div>
            <span className='mt-2 opacity-70'>Bienvenido,</span>
            <h3 className='font-semibold'>{user.name}</h3>
          </div>
        )}
      </div>

      {/* Search and Compare Section */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold'>Búsqueda de Productos</h2>
        <div className='border-t border-green-300 mt-2'></div>
        <div className='mt-3'>
          <input
            type='text'
            placeholder='Buscar productos...'
            className='w-full p-2 border border-green-200 rounded focus:outline-none focus:border-green-400'
          />
          <button className='bg-green-500 text-white px-4 py-2 rounded mt-2'>
            Buscar
          </button>
        </div>
      </div>

      {/* Price Comparison Section */}
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Comparador de Precios</h2>
        <div className='border-t border-green-300 mt-2'></div>
        <div className='mt-3'>
          <input
            type='text'
            placeholder='Comparar precios...'
            className='w-full p-2 border border-green-200 rounded focus:outline-none focus:border-green-400'
          />
          <button className='bg-green-500 text-white px-4 py-2 rounded mt-2'>
            Comparar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
