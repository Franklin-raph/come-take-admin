import React, { useState } from 'react'

const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function loginAdmin(){
        localStorage.setItem('admin', 1)
        window.location.href = '/'
    }

  return (
    <div>
      <div className='flex items-center flex-col justify-center h-[100vh] w-full bg-gray-500'>
        <div className='flex items-center flex-col justify-center'>
          <p className='mb-3 text-2xl font-bold text-gray-300'>Admin Login</p>
          <input type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} className='border outline-none p-2'/>
          <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} className='border outline-none p-2 mt-3' />
          {
            loading ?
            <button className='bg-[#6266f1] text-center text-white p-2 rounded w-full mt-3 cursor-not-allowed'>Loading...</button>
            :
            <button onClick={loginAdmin} className='bg-[#96BF47] text-center text-white p-2 rounded w-full mt-3'>Login</button>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminLogin