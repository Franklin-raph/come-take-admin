import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleCustomer = ({baseUrl}) => {
    const { id } = useParams()

    console.log(id);
    // https://cometake.pythonanywhere.com/administrator/dashboard/customer/{user_id}
    async function getSingleCustomer(){
        const res = await fetch(`${baseUrl}/dashboard/customer/${id}`,{
            headers:{
              Authorization:`Bearer ${admin.data[0].access}`
            }
        })
        const data = await res.json()
        console.log(res, data);
    }

    useEffect(() => {
        getSingleCustomer()
    },[])

  return (
    <div>
        <div>
            <p>Customer's Details</p>
            <div className='flex gap-[20px]'>
                <div className='grid grid-cols-4 flex-[95%] bg-white rounded-xl px-5 py-10'>
                    <div className='bg-red-400 w-[90%] h-[205px] rounded-xl'></div>
                    <div>
                        <div>
                            <p className='text-[#5C5C5C]'>Full Name</p>
                            <p className='text-[#5C5C5C] font-[500]'>Emeka Ugwu</p>
                        </div>
                        <div className='my-8'>
                            <p className='text-[#5C5C5C]'>Gender</p>
                            <p className='text-[#5C5C5C] font-[500]'>Male</p>
                        </div>
                        <div>
                            <p className='text-[#5C5C5C]'>Last Seen</p>
                            <p className='text-[#5C5C5C] font-[500]'>Emeka Ugwu</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className='text-[#5C5C5C]'>Email</p>
                            <p className='text-[#5C5C5C] font-[500]'>emeka@gmail.com</p>
                        </div>
                        <div className='my-8'>
                            <p className='text-[#5C5C5C]'>Date Of Birth</p>
                            <p className='text-[#5C5C5C] font-[500]'>11/23/1990</p>
                        </div>
                        <div>
                            <p className='text-[#5C5C5C]'>Items Listed</p>
                            <p className='text-[#5C5C5C] font-[500]'>23 Items</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className='text-[#5C5C5C]'>Phone</p>
                            <p className='text-[#5C5C5C] font-[500]'>08156546766</p>
                        </div>
                        <div className='my-8'>
                            <p className='text-[#5C5C5C]'>Date Created</p>
                            <p className='text-[#5C5C5C] font-[500]'>11/23/2024</p>
                        </div>
                        <div>
                            <p className='text-[#5C5C5C]'>Account Status</p>
                            <p className='text-[#5C5C5C] font-[600]'>23 Items</p>
                        </div>
                    </div>
                </div>
                <div className='flex-[35%] bg-white py-2 rounded-xl px-5'>
                    <p className='text-[#333333] text-[20px] font-[500] mt-2'>Others</p>
                    <div className='my-5'>
                        <p className='text-[#5C5C5C] font-[500]'>Store Address</p>
                        <p className='text-[#B6B6B6]'>No 5 umuluo street ezinifite Mgdidi Ikom</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-[#5C5C5C] font-[500]'>City</p>
                            <p className='text-[#B6B6B6]'>Ikeja</p>
                        </div>
                        <div>
                            <p className='text-[#5C5C5C] font-[500]'>State</p>
                            <p className='text-[#B6B6B6]'>Lagos</p>
                        </div>
                    </div>
                    <div className='my-5'>
                        <p className='text-[#5C5C5C] font-[500]'>Mode Of Verification</p>
                        <p className='text-[#B6B6B6]'>International Passport</p>
                    </div>
                    <div>
                        <p className='text-[#5C5C5C] font-[500]'>Passport Number</p>
                        <p className='text-[#B6B6B6]'>NA23456</p>
                    </div>
                    <div className='my-5'>
                        <p className='text-[#5C5C5C] font-[500]'>JPG</p>
                        <div>
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleCustomer