import React from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { TiDocumentText } from 'react-icons/ti';
import { PiNotification } from "react-icons/pi";
import { TbSettings2 } from "react-icons/tb";

const SideNav = () => {
  return (
    <div className='bg-[#003C2F] w-[20%] h-[100dvh] fixed'>
      <h1 className='text-white text-[32px] text-center font-[700] my-5'>Admin</h1>
      <ul className='text-white'>
        <li className='bg-secondary-color py-3 pl-3'>
          <Link to="/customers" className='flex items-center gap-3'>
            <CiUser fontSize={"22px"}/>
            <p>Customers</p>
          </Link>
        </li>
        <li className='py-3 pl-3'>
          <Link to="/customers" className='flex items-center gap-4'>
            <PiNotification />
            <p>Notification</p>
          </Link>
        </li>
        <li className='py-3 pl-3'>
          <Link to="/customers" className='flex items-center gap-4'>
            <TiDocumentText />
            <p>Transactions</p>
          </Link>
        </li>
        <li className='py-3 pl-3'>
          <Link to="/customers" className='flex items-center gap-4'>
            <TbSettings2 />
            <p>Settings</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideNav