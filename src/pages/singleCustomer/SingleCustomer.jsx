import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageView from '../../components/imageView/ImageView'

const SingleCustomer = ({baseUrl}) => {
    const { id } = useParams()
    const [imgView, setImgView] = useState('')
    const [customerDetails, setCustomerDetails] = useState()
    const [verifyCustomerModel, setVerifyCustomerModel] = useState(false)
    const [loading, setLoading] = useState(false)
    const admin = JSON.parse(localStorage.getItem('admin'))

    console.log(id);
    async function getSingleCustomer(){
        const res = await fetch(`${baseUrl}/dashboard/customer/${id}`,{
            headers:{
              Authorization:`Bearer ${admin.data[0].access}`
            }
        })
        const data = await res.json()
        setCustomerDetails(data.data)
        console.log(res, data);
    }

    async function acceptSeller(){
        setLoading(true)
        const res = await fetch(`https://api.yamltech.com/admin/dashboard/customer/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${admin.data[0].access}`
            },
            body: JSON.stringify({kyc_status:'approved'})
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(res.ok){
            alert("Seller successfully approved")
            setVerifyCustomerModel(false)
        }
        console.log(res, data);
    }

    async function rejectSeller(){
        setLoading(true)
        const res = await fetch(`https://api.yamltech.com/admin/dashboard/customer/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${admin.data[0].access}`
            },
            body: JSON.stringify({kyc_status:'rejected'})
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(res.ok){
            alert("Seller not approved")
            setVerifyCustomerModel(false)
        }
        console.log(res, data);
    }


    useEffect(() => {
        getSingleCustomer()
    },[])

  return (
    <div>
        {
            verifyCustomerModel && 
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setVerifyCustomerModel(false)}></div>
                <div className="bg-white w-[500px] flex items-center justify-center fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100] login-modal" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className='w-full px-[1.7rem] lg:px-[3rem]'>
                        <div>
                            <p className='text-primary-color text-[28px] text-center'>Verify Seller</p>
                            <div className='text-[#989898] text-center mt-[1rem]'>
                                <p>Are you sure, you want to verify this customer to be a seller?</p>
                            </div>
                            {
                                loading ?
                                <div className='flex items-center justify-center gap-3 mt-5 text-white w-full bg-gray-500 text-center rounded-md py-1'>
                                    <p>Loading</p>
                                </div>
                                :
                                <div className='flex items-center gap-3 mt-5 text-white'>
                                    <button className='bg-red-500 rounded-md py-1 w-full' onClick={rejectSeller}>Reject</button>
                                    <button className='bg-[#96BF47] rounded-md py-1 w-full' onClick={acceptSeller}>Accept</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
        <div>
            <p>Customer's Details</p>
            {
                customerDetails &&
                <div className='flex gap-[20px]'>
                    <div className='grid grid-cols-4 flex-[95%] bg-white rounded-xl px-5 py-10'>
                        <div className='bg-gray-400 w-[90%] h-[205px] rounded-xl'></div>
                        <div>
                            <div>
                                <p className='text-[#5C5C5C]'>Full Name</p>
                                <p className='text-[#5C5C5C] font-[500]'>{customerDetails.first_name} {customerDetails.last_name}</p>
                            </div>
                            <div className='my-8'>
                                <p className='text-[#5C5C5C]'>Gender</p>
                                <p className='text-[#5C5C5C] font-[500]'>Male</p>
                            </div>
                            <div>
                                <p className='text-[#5C5C5C]'>Last Seen</p>
                                <p className='text-[#5C5C5C] font-[500]'>{new Date(customerDetails.last_seen).toDateString()}</p>
                            </div>
                            <div className='mt-8'>
                                <p className='text-[#5C5C5C]'>Is Seller</p>
                                <div className='flex items-center gap-3'>
                                    <p className='text-[#5C5C5C] font-[500] capitalize'>{customerDetails.kyc_status}</p>
                                    {
                                        customerDetails.kyc_status === "not_set" ? "" : <button className='border py-[2px] mt-1 w-full text-[#5C5C5C] px-4 rounded-md' onClick={() => setVerifyCustomerModel(true)}>Verify</button>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='text-[#5C5C5C]'>Email</p>
                                <p className='text-[#5C5C5C] font-[500]'>{customerDetails.email}</p>
                            </div>
                            <div className='my-8'>
                                <p className='text-[#5C5C5C]'>Date Of Birth</p>
                                <p className='text-[#5C5C5C] font-[500]'>{new Date(customerDetails.date_of_birth).toDateString()}</p>
                            </div>
                            <div>
                                <p className='text-[#5C5C5C]'>Items Listed</p>
                                <p className='text-[#5C5C5C] font-[500]'>23 Items</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='text-[#5C5C5C]'>Phone</p>
                                <p className='text-[#5C5C5C] font-[500]'>{customerDetails.phone}</p>
                            </div>
                            <div className='my-8'>
                                <p className='text-[#5C5C5C]'>Date Created</p>
                                <p className='text-[#5C5C5C] font-[500]'>{new Date(customerDetails.date_joined).toDateString()}</p>
                            </div>
                            <div>
                                <p className='text-[#5C5C5C] mb-1'>Account Status</p>
                                {
                                    customerDetails.is_active ?
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer" checked />
                                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                                    </label>
                                    :
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer" />
                                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#96BF47]"></div>
                                    </label>
                                }
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
                                <p className='text-[#B6B6B6]'>{customerDetails.city}</p>
                            </div>
                            <div>
                                <p className='text-[#5C5C5C] font-[500]'>State</p>
                                <p className='text-[#B6B6B6]'>{customerDetails.state}</p>
                            </div>
                        </div>
                        <div className='my-5'>
                            <p className='text-[#5C5C5C] font-[500]'>Mode Of Verification</p>
                            <p className='text-[#B6B6B6]'>{customerDetails.id_card_type}</p>
                        </div>
                        <div>
                            <p className='text-[#5C5C5C] font-[500]'>Passport Number</p>
                            <p className='text-[#B6B6B6]'>{customerDetails.id_card_number}</p>
                        </div>
                        <div className='my-5'>
                            <p className='text-[#5C5C5C] font-[500]'>JPG</p>
                            <div className='flex items-ceter gap-5'>
                                <img onClick={e => setImgView(customerDetails.id_card_image_front_view)} src={customerDetails.id_card_image_front_view} className='w-[100px] h-[100px] object-contain cursor-pointer' alt="" />
                                <img onClick={e => setImgView(customerDetails.id_card_image_back_view)} src={customerDetails.id_card_image_back_view} className='w-[100px] h-[100px] object-contain cursor-pointer' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                imgView && <ImageView imgView={imgView} setImgView={setImgView}/>
            }
        </div>
    </div>
  )
}

export default SingleCustomer