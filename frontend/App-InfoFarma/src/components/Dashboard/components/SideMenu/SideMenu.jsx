import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Profile from '../../../Profile/Profile'; 

function SideMenu() {
  const user = Profile().props.user;

  return (
    <div className='bg-sideMenuBg relative h-[100%] basis-20 p-4'>
      {/* Logo Div */}
      <div className='logo mt-4 gap-2 text-[white] flex items-center justify-center m-auto'>
        <RxHamburgerMenu className='text-[20px]' />
        <h1 className='text-[20px] text-center justify-center font-black'>Medicamento</h1>
      </div>

      {/* User Div */}
      <div className='flex items-center justify-center text-[white] flex-col mt-[3rem] admin'>
        <img src={user.picture} alt='Admin Image' className='h-[80px] w-[80px] border-red-200 border-[4px] object-cover rounded-full' />
        <span className='opacity-70 mt-2 text-gray-400'>Bienvenido,</span>
        <h3 className='font-bold text-textColor'>{user.name}</h3>
      </div>

      {/* simple Menu */}
      <div className='m-auto grid justify-center mt-4'>
      </div>

      {/* Sidemenu Map Div */}
      <div className='mt-5 h-[14rem] w-full rounded-xl overflow-hidden'>
        <img src='' alt='Map Image' className='object-cover h-[100%]'></img>
      </div>
    </div>
  );
}

export default SideMenu