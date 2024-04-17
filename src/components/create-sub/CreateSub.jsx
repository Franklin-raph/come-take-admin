import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";


const CreateSub = ({setShowSub}) => {

    const [title, setTitle] = useState('')
    const [no_of_product_upload_per_month, setNoOfProductUploadPerMonth] = useState('')
    const [price, setPrice] = useState('')
    const [plan_description, setPlanDescription] = useState('')
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [loading, setLoading] = useState(false)

    async function createSub(){
        if(!price || !no_of_product_upload_per_month || !plan_description || !title){
            alert("Please fill in all the fields")
        }else{
            setLoading(true)
            const res = await fetch(`https://api.yamltech.com/admin/dashboard/create-subscription-plan`,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${admin.data[0].access}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({title, no_of_product_upload_per_month, price, plan_description})
            })
            const data = await res.json()
            if(res) setLoading(false)
            if(res.ok){
                alert("Subscription was successfully created")
            }
            if(!res.ok){
                alert("An error occured, subscription was not created successfully")
            }
            console.log(res, data);
        }
    }

  return (
    <div className='fixed top-0 left-0 h-full w-full z-[9999] flex items-center justify-center'  style={{ background:"rgba(14, 14, 14, 0.58)" }}>
        <div className="flex items-end flex-col gap-5 mt-5 w-[50%] mx-auto bg-white py-3 px-6 rounded-[6px]">
            <IoCloseSharp  onClick={() => setShowSub(false)} className='cursor-pointer '/>
            <div className="w-full">
                <p>Subscription Tile</p>
                <input onChange={e => setTitle(e.target.value)} type="text" className="mt-2 outline-none px-4 py-2 w-full rounded-[6px] placeholder:text-[#B6B6B6]" placeholder="Basic Plan" style={{ border:"1.5px solid #CCCCCC" }}/>
            </div>
            <div className="w-full">
                <p>Price</p>
                <input onChange={e => setPrice(e.target.value)} type="number" className="mt-2 outline-none px-4 py-2 w-full rounded-[6px] placeholder:text-[#B6B6B6]" placeholder="#32,000" style={{ border:"1.5px solid #CCCCCC" }}/>
            </div>
            <div className="w-full">
                <p>Number of Product to be uploaded per month</p>
                <input onChange={e => setNoOfProductUploadPerMonth(e.target.value)} type="text" className="mt-2 outline-none px-4 py-2 w-full rounded-[6px] placeholder:text-[#B6B6B6]" placeholder="10" style={{ border:"1.5px solid #CCCCCC" }}/>
            </div>
            <div className="w-full">
                <p>Product Description</p>
                <textarea cols="30" rows="5" onChange={e => setPlanDescription(e.target.value)} placeholder='Subscription Benefits' style={{ border:"1.5px solid #CCCCCC" }} className="mt-2 outline-none px-4 py-3 w-full rounded-[6px] placeholder:text-[#B6B6B6]"></textarea>
            </div>
            {
                loading ? 
                <button className='bg-primary-color w-full text-white py-2 rounded-[6px] cursor-not-allowed'>Loading...</button>
                :
                <button onClick={createSub} className='bg-primary-color w-full text-white py-2 rounded-[6px]'>Create Subscription</button>
            }
        </div>
    </div>
  )
}

export default CreateSub