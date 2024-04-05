import React, { useState } from 'react'

const AdminLogin = ({baseUrl}) => {

    const [email, setEmail] = useState('nwaforglory6@gmail.com')
    const [password, setPassword] = useState('1234')
    const [loading, setLoading] = useState(false)

    // async function loginAdmin(){
    //     localStorage.setItem('admin', 1)
    //     window.location.href = '/'
    // }

    async function loginAdmin(){
      if(!email || !password){
        alert('Please fill in the fields')
      }else{
          setLoading(true)
          const res = await fetch(`https://cometake.pythonanywhere.com/login`, {
            method:"POST",
            headers: {
              "Content-Type":"application/json"
            },
            body: JSON.stringify({email, password})
          })
          const data = await res.json()
          console.log(res, data);
          if(res) setLoading(false)
          if(!res.ok){
            alert(data.detail)
          }
          if(res.ok){
            localStorage.setItem('admin', JSON.stringify(data))
            window.location.href = '/'
          }
      }
    }
      // localStorage.setItem("user", 1)
      // setLoginModal(false)
      // navigate("/")

  return (
    <div>
      <div className='flex items-center flex-col justify-center h-[100vh] w-full bg-gray-500'>
        <div className='flex items-center flex-col justify-center'>
          <p className='mb-3 text-2xl font-bold text-gray-300'>Admin Login</p>
          <input type="text" placeholder='Email' value={'nwaforglory6@gmail.com '} onChange={e => setEmail(e.target.value)} className='border outline-none p-2'/>
          <input type="password" placeholder='Password' value={'1234'} onChange={e => setPassword(e.target.value)} className='border outline-none p-2 mt-3' />
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