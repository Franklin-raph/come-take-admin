import React, { useEffect, useState } from 'react'
import CreateCategory from '../../components/create-category/CreateCategory'
import { HiOutlineTrash } from "react-icons/hi2";
import { GoPencil } from "react-icons/go";
import DeleteCategoryModal from '../../components/delete-category-modal/DeleteCategoryModal';
import EditCategoryModal from '../../components/edit-category-modal/EditCategoryModal';

const Categories = () => {

    const [showCategory, setShowCategory] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
    const [editCategoryModal, setEditCategoryModal] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const admin = JSON.parse(localStorage.getItem('admin'))

    async function getAllCategories(){
        const res = await fetch(`https://cometakebe-4t5h.onrender.com/categories`,{
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
                    <div className="flex items-center gap-3">
                        <GoPencil className='text-yellow-500 cursor-pointer' onClick={() => setEditCategoryModal(category)}/>
                        <p className='text-gray-500 text-[14px]'>Or</p>
                        <HiOutlineTrash className='text-red-500 cursor-pointer' onClick={() => setDeleteCategoryModal(category.id)}/>
                    </div>
                </div>
            ))
        }
        {
            showCategory && <CreateCategory getAllCategories={getAllCategories} setShowCategory={setShowCategory}/>
        }

        {
            deleteCategoryModal && <DeleteCategoryModal setDeleteCategoryModal={setDeleteCategoryModal} getAllCategories={getAllCategories} deleteCategoryModal={deleteCategoryModal}/>
        }

        {
            editCategoryModal && <EditCategoryModal editCategoryModal={editCategoryModal} getAllCategories={getAllCategories} setEditCategoryModal={setEditCategoryModal}/>
        }
    </div>
  )
}

export default Categories