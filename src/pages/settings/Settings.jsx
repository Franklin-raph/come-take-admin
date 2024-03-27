import React, { useEffect, useState } from 'react'

const Settings = ({baseUrl}) => {

  const admin = JSON.parse(localStorage.getItem('admin'))
  const [adminDetails, setAdminDetails] = useState()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  async function getAdminDetails(){
    console.log('eee');
    const res = await fetch(`https://cometake.pythonanywhere.com/complete-registration`,{
      headers:{
        Authorization:`Bearer ${admin.data[0].access}`
      }
    })
    const data = await res.json()
    setAdminDetails(data.data)
    if(res.ok){
      setFirstName(data.data.first_name)
      setLastName(data.data.last_name)
      setEmail(data.data.email)
      setPhone(data.data.phone)
    }
    // setUserDetails(data.data)
    console.log(res, data);
  }

  useEffect(() =>{
    // alert("helo")
    getAdminDetails()
  },[])

  async function updateProfile(){
    const res = await fetch(`https://cometake.pythonanywhere.com/update-profile`,{
      method:"PUT",
      body: JSON.stringify({first_name, last_name, email, phone}),
      headers:{
        Authorization:`Bearer ${admin.data[0].access}`,
        'Content-Type':'application/json'
      }
    })
    const data = await res.json()
    if(res.ok){
      alert(data.message)
      getAdminDetails()
    }
    if(!res.ok){
      alert(data.message)
    }
    console.log(res, data);
  }

  return (
    <div className='flex items-start justify-between bg-[#F6F6F6]'>
      <div className='flex items-start flex-col justify-start pt-5 w-[25%] gap-5 text-[#5C5C5C] border-r h-[100vh]'>
        <button className='w-full text-left py-2 px-8 bg-white'>Profile</button>
        <button className='w-full text-left py-2 px-8'>Manage Password</button>
        <button className='w-full text-left py-2 px-8'>Notifications</button>
      </div>
      <div className='w-[75%] flex items-center justify-center flex-col'>
        <div className='text-center text-[#5C5C5C]'>
          <img src="/userimg.png" className='w-[100px] mb-2 mx-auto' alt="" />
          <div className='font-[600] flex items-center justify-center gap-2'>
            {
              adminDetails && <p>{adminDetails.first_name}</p>
            }
            {
              adminDetails && <p>{adminDetails.last_name}</p>
            }
          </div>
            {
              adminDetails && <p>{adminDetails.email}</p>
            }
        </div>
        <div className='flex items-center gap-10 mt-[3rem]'>
          <div>
            <p className='text-[#1C1C1C] font-[600]'>First Name</p>
            <input placeholder='John' value={first_name} onChange={e => setFirstName(e.target.value)} type="text" className='border bg-transparent p-2 rounded mt-1' />
          </div>
          <div>
            <p className='text-[#1C1C1C] font-[600]'>Last Name</p>
            <input placeholder='Doe' value={last_name} onChange={e => setLastName(e.target.value)} type="text" className='border bg-transparent p-2 rounded mt-1' />
          </div>
        </div>
        <div className='flex items-center gap-10 mt-[3rem] w-[71%]'>
          <div className='w-full'>
            <p className='text-[#1C1C1C] font-[600]'>Email</p>
            <input placeholder='johndoe@gmail.com' value={email} onChange={e => setEmail(e.target.value)} type="text" className='border bg-transparent p-2 rounded mt-1 w-full' />
          </div>
        </div>
        <div className='flex items-center gap-10 mt-[3rem] w-[71%]'>
          <div className='w-full'>
            <p className='text-[#1C1C1C] font-[600]'>Phone Number</p>
            <input placeholder='08122233344' value={phone} onChange={e => setPhone(e.target.value)} type="text" className='border bg-transparent p-2 rounded mt-1 w-full' />
          </div>
        </div>
        <div className='flex justify-between w-[71%] mt-[3rem]'>
          <p></p>
          <button className='bg-[#9C9C9C] text-white block py-2 px-10 rounded-full' onClick={updateProfile}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default Settings