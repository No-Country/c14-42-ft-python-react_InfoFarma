import React from 'react'
import SideMenu from './SideMenu/SideMenu'
import Body from './Body/Body'

const Container = () => {
  return (
    <div className='flex m-auto h-[90vh] items-center justify-center w-[85vw] my-10 rounded-xl overflow-hidden'>
      <SideMenu />
      <Body />
    </div>
  )
}

export default Container