import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const CreateCategory = ({setShowCategory, getAllCategories}) => {

    const [name, setName] = useState('')
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [loading, setLoading] = useState(false)

    async function createCategory(){
        setLoading(true)
        const res = await fetch(`https://cometakebe-4t5h.onrender.com/administrator/dashboard/add-category`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${admin.data[0].access}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name})
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(res.ok){
            alert("Category successfully added")
            setShowCategory(false)
            getAllCategories()
        }
        console.log(data);
    }

  return (
    <div className='fixed top-0 left-0 h-full w-full z-[9999] flex items-center justify-center'  style={{ background:"rgba(14, 14, 14, 0.58)" }}>
        <div className="flex items-end flex-col gap-5 mt-5 w-[50%] mx-auto bg-white py-3 px-6 rounded-[6px]">
            <IoCloseSharp  onClick={() => setShowCategory(false)} className='cursor-pointer '/>
            <div className="w-full">
                <p>Category Name</p>
                <input onChange={e => setName(e.target.value)} type="text" className="mt-2 outline-none px-4 py-2 w-full rounded-[6px] placeholder:text-[#B6B6B6]" placeholder="Category Name" style={{ border:"1.5px solid #CCCCCC" }}/>
            </div>
            {
                loading ? 
                <button className='bg-primary-color w-full text-white py-2 rounded-[6px] cursor-not-allowed'>Loading...</button>
                :
                <button onClick={createCategory} className='bg-primary-color w-full text-white py-2 rounded-[6px]'>Create Category</button>
            }
        </div>
    </div>
  )
}

export default CreateCategory