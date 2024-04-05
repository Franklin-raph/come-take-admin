import React, { useEffect, useState } from 'react'
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const Settings = ({baseUrl}) => {

  const admin = JSON.parse(localStorage.getItem('admin'))
  const [adminDetails, setAdminDetails] = useState()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const tab = ['Profile', 'Password', 'Notification']
  const [selectedTab, setSelectedTab] = useState(tab[0])

  const [passwordType, setPasswordType] = useState("password")
  const [emailNotification, setEmailNotification] = useState(true)
  const [notificationSound, setNotificationSound] = useState(false)

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

  function updateNotification(){
    console.log(notificationSound);
  }

  return (
    <div className='flex items-start justify-between bg-[#F6F6F6]'>
      <div className='flex items-start flex-col justify-start pt-5 w-[25%] gap-5 text-[#5C5C5C] border-r h-[100vh]'>
        {
          tab.map(btn => (
            <button onClick={() => setSelectedTab(btn)} className='w-full text-left py-2 px-8'>{btn}</button>
          ))
        }
        {/* <button className='w-full text-left py-2 px-8 bg-white'>Profile</button>
        <button className='w-full text-left py-2 px-8'>Manage Password</button>
        <button className='w-full text-left py-2 px-8'>Notifications</button> */}
      </div>

      {
        selectedTab === 'Profile' &&
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
            <div className='flex items-center gap-10 mt-[3rem] w-[71%]'>
              <div className='w-full'>
                <p className='text-[#1C1C1C] font-[600]'>First Name</p>
                <input placeholder='John' value={first_name} onChange={e => setFirstName(e.target.value)} type="text" className='w-full border bg-transparent p-2 rounded mt-1' />
              </div>
              <div className='w-full'>
                <p className='text-[#1C1C1C] font-[600]'>Last Name</p>
                <input placeholder='Doe' value={last_name} onChange={e => setLastName(e.target.value)} type="text" className='w-full border bg-transparent p-2 rounded mt-1' />
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
      }

      {
        selectedTab === 'Password' &&
          <div className='w-[75%] flex items-center justify-center flex-col'>
            <div className="relative input-container mt-4 w-[60%]">
              <label>Current Password</label>
                <div className='mt-2 w-full p-[2px] border border-gray-300 flex items-center justify-between gap-2 rounded-[6px]'>
                  <div className='w-full p-[2px] flex items-center gap-2'>
                    <input name='password' onChange={e => setPassword(e.target.value)} className="w-full text-lg px-2 focus:outline-none bg-transparent" type={passwordType} placeholder="********" />
                  </div>
                  <p className='mr-2'>
                    {passwordType === "password" ?
                      <GoEye color='gray' fontSize={"20px"} cursor={"pointer"} onClick={() => setPasswordType("text")}/>
                      : 
                      <GoEyeClosed color='gray' fontSize={"20px"} cursor={"pointer"} onClick={() => setPasswordType("password")}/>
                    }
                  </p>
                </div>
            </div>
            <div className="relative input-container mt-9 w-[60%]">
              <label>New Password</label>
                <div className='mt-2 w-full p-[2px] border border-gray-300 flex items-center justify-between gap-2 rounded-[6px]'>
                  <div className='w-full p-[2px] flex items-center gap-2'>
                    <input name='password' onChange={e => setPassword(e.target.value)} className="w-full text-lg px-2 focus:outline-none bg-transparent" type={passwordType} placeholder="********" />
                  </div>
                  <p className='mr-2'>
                    {passwordType === "password" ?
                      <GoEye color='gray' fontSize={"20px"} cursor={"pointer"} onClick={() => setPasswordType("text")}/>
                      : 
                      <GoEyeClosed color='gray' fontSize={"20px"} cursor={"pointer"} onClick={() => setPasswordType("password")}/>
                    }
                  </p>
                </div>
            </div>
            <div className="relative input-container mt-9 w-[60%]">
              <label>Confirm Password</label>
                <div className='mt-2 w-full p-[2px] border border-gray-300 flex items-center justify-between gap-2 rounded-[6px]'>
                  <div className='w-full p-[2px] flex items-center gap-2'>
                    <input name='password' onChange={e => setPassword(e.target.value)} className="w-full text-lg px-2 focus:outline-none bg-transparent" type={passwordType} placeholder="********" />
                  </div>
                  <p className='mr-2'>
                    {passwordType === "password" ?
                      <GoEye color='gray' fontSize={"20px"} cursor={"pointer"} onClick={() => setPasswordType("text")}/>
                      : 
                      <GoEyeClosed color='gray' fontSize={"20px"} cursor={"pointer"} onClick={() => setPasswordType("password")}/>
                    }
                  </p>
                </div>
            </div>
            <div className='flex justify-between w-[71%] mt-[3rem]'>
              <p></p>
              <button className='bg-[#9C9C9C] text-white block py-2 px-10 rounded-full' onClick={updateProfile}>Save Changes</button>
            </div>
          </div>
      }

      {
        selectedTab === 'Notification' &&
          <div className='w-[75%] flex items-center justify-center flex-col'>
            <div className="relative input-container mt-4 w-[60%] flex justify-between items-center">
              <p>Receive email notifications</p>
              <div>
                  {
                      emailNotification === true ?
                      <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                      </label>
                      :
                      <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                      </label>
                  }
              </div>
            </div>
            <div className="relative input-container mt-4 w-[60%] flex justify-between items-center">
              <p>Receive notifications for new Members</p>
              <div>
                  {
                      emailNotification === true ?
                      <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                      </label>
                      :
                      <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                      </label>
                  }
              </div>
            </div>
            <div className="relative input-container mt-4 w-[60%] flex justify-between items-center">
              <p>Notification sounds</p>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" onChange={() => setNotificationSound(true)} />
                    <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                </label>
                  {/* {
                      notificationSound === true ?
                      <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" onChange={() => setNotificationSound(true)} />
                          <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                      </label>
                      :
                      <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" onChange={() => setNotificationSound(true)} />
                          <div class="relative w-11 h-6 bg-[#b8b8b8] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                      </label>
                  } */}
              </div>
            </div>
            <div className='flex justify-between w-[71%] mt-[3rem]'>
              <p></p>
              <button className='bg-[#9C9C9C] text-white block py-2 px-10 rounded-full' onClick={updateNotification}>Save Changes</button>
            </div>
          </div>
      }

    </div>
  )
}

export default Settings