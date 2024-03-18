import React from 'react'
import { CiUser } from "react-icons/ci";
import { IoEyeOffSharp } from "react-icons/io5";
import { SlTrash } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";


const CustomerDropDown = () => {
  return (
    <div className='bg-white border p-3'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <CiUser className='text-[20px] font-[700]'/>
            <p className='text-[14px]'>View Details</p>
        </div>
        <div className='flex items-center gap-2 py-3 cursor-pointer'>
            <CiEdit className='text-[20px] font-[700]'/>
            <p className='text-[14px]'>Edit Details</p>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
            <IoEyeOffSharp className='text-[20px] font-[700]'/>
            <p className='text-[14px]'>Freeze Account</p>
        </div>
        <div className='flex items-center gap-2 pt-3 cursor-pointer'>
            <SlTrash className='text-[20px] font-[700]'/>
            <p className='text-[14px]'>Delete Account</p>
        </div>
    </div>
  )
}

export default CustomerDropDown