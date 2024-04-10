import React, { useEffect, useState } from 'react'
import CreateCategory from '../../components/create-category/CreateCategory'

const Categories = () => {

    const [showCategory, setShowCategory] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const admin = JSON.parse(localStorage.getItem('admin'))

    async function getAllCategories(){
        const res = await fetch(`https://cometake.pythonanywhere.com/categories`,{
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
            <p>Available Subscriptions</p>
            <button className='bg-primary-color text-white px-3 py-1 rounded-full' onClick={() => setShowCategory(true)}>Create New Category</button>
        </div>
        {
            allCategory && allCategory.map(category => (
                <p className='my-1 cursor-pointer'>{category.name}</p>
            ))
        }
        {
            showCategory && <CreateCategory getAllCategories={getAllCategories} setShowCategory={setShowCategory}/>
        }
    </div>
  )
}

export default Categories