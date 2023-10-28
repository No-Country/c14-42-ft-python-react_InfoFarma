import React from 'react'
import { AiOutlineAppstoreAdd, AiOutlineSearch } from 'react-icons/ai'

const Body = () => {
  return (
    <div className='bg-bodyBg h-[100%] basis-80 p-8'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center border-b-2 pb-2 basis-1/2 gap-2'>
          <AiOutlineSearch className='text-hoverColor text-[20px] cursor-pointer' />
          <input type='text' placeholder='Busca tu medicamento' className='border-none outline-none placeholder:text-sm focus:outline-none'/>
        </div>

        <div className='flex gap-4 items-center'>
          <AiOutlineAppstoreAdd className='text-hoverColor cursor-pointer text-[50px] hover:text-[20px] transition-all' />
          <button className='bg-sideMenuBg cursor-pointer text-bodyBg font-semibold py-2 px-4 rounded-[5px] hover:bg-[#55545e] transition-all'>Go Premium</button>
        </div>
      </div>
    </div>
  )
}

export default Body