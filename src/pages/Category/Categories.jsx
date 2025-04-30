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
    const [loading, setLoading] = useState(false)
    const admin = JSON.parse(localStorage.getItem('admin'))

    async function getAllCategories(){
        setLoading(true)
        const res = await fetch(`https://cometakebe-4t5h.onrender.com/categories`,{
            headers:{
                Authorization:`Bearer ${admin.data[0].access}`
            }
        })
        if(res) setLoading(false)
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

        <div className="relative overflow-x-auto sm:rounded-lg mt-9">
            {loading ? (
            <div className='flex justify-center items-center py-20 w-full'>
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <p className='text-[#333333] text-[16px] font-[500]'>Loading...</p>
            </div>
            ) : allCategory.length === 0 ? (
            <div className='flex flex-col justify-center items-center py-20 w-full'>
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className='text-[#333333] text-[18px] font-[500]'>No Category available</p>
            </div>
            ) : (
                <>
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
                </>
            )}
        </div>



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