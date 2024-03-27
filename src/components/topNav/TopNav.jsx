import React from 'react'
import { IoSearchOutline } from "react-icons/io5";


const TopNav = () => {

  const admin = JSON.parse(localStorage.getItem('admin'))

  console.log(admin.data);

  return (
    <div className='w-[85%] bg-white fixed shadow right-0 flex items-center justify-between py-[1rem] px-[3rem] z-[99]'>
      <p className='font-[700] text-[24px]'>Hello, {admin.data[1].first_name}</p>
      <div className='flex items-center'>
        <div className='border border-[#CFCFCF] rounded-full flex items-center py-1 px-3'>
          <input type="text" className='outline-none'/>
          <IoSearchOutline />
        </div>
        <img src="./userimg.png" className='w-[40px] ml-7' alt="" />
      </div>
    </div>
  )
}

export default TopNav