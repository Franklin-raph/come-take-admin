import React, { useEffect, useState } from 'react'
import CreateCategory from '../../components/create-category/CreateCategory'
import { HiOutlineTrash } from "react-icons/hi2";
import { GoPencil } from "react-icons/go";

const Categories = () => {

    const [showCategory, setShowCategory] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const admin = JSON.parse(localStorage.getItem('admin'))

    async function getAllCategories(){
        const res = await fetch(`https://api.yamltech.com/categories`,{
            headers:{
                Authorization:`Bearer ${admin.data[0].access}`
            }
        })
        const data = await res.json()
        if(res.ok){
            setAllCategory(data.data)
        }
        console.log(data);
    }
    
    useEffect(()=> {
        getAllCategories()
    },[])


  return (
    <div>
        <div className='flex items-center justify-between mb-5'>
            <p>Available Categories</p>
            <button className='bg-primary-color text-white px-3 py-1 rounded-full' onClick={() => setShowCategory(true)}>Create New Category</button>
        </div>
        {
            allCategory && allCategory.map(category => (
                <div className='flex items-center justify-between border-b'>
                    <p className='my-3 cursor-pointer hover:text-gray-500'>{category.name}</p>
                    <div className="flex items-center gap-2">
                        <GoPencil className='text-yellow-500 cursor-pointer'/>
                        <p>Or</p>
                        <HiOutlineTrash className='text-red-500 cursor-pointer'/>
                    </div>
                </div>
            ))
        }
        {
            showCategory && <CreateCategory getAllCategories={getAllCategories} setShowCategory={setShowCategory}/>
        }
    </div>
  )
}

export default Categories