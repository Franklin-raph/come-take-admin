import React, { useState } from 'react'

const DeleteCategoryModal = ({setDeleteCategoryModal, getAllCategories, deleteCategoryModal}) => {

    const [loading, setLoading] = useState(false)
    const admin = JSON.parse(localStorage.getItem('admin'))

    async function deleteCategory(){
        setLoading(true)
        const res =  await fetch(`https://cometakebe-4t5h.onrender.com/administrator/dashboard/category/${deleteCategoryModal}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${admin.data[0].access}`
            }
        })
        console.log(res);
        if(res.ok){
            setLoading(false)
            setDeleteCategoryModal(false)
            alert("Product category was successfully deleted")
            getAllCategories()
        }
    }

  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteCategoryModal(false)}></div>
        <div className="bg-white w-[500px] flex items-center justify-center fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100] login-modal" style={{ transform: "translate(-50%, -50%)" }}>
            <div className='w-full px-[1.7rem] lg:px-[3rem]'>
                <div>
                    <p className='text-primary-color text-[28px] text-center'>Delete Product Category</p>
                    <div className='text-[#989898] text-center mt-[1rem]'>
                        <p>Are you sure, you want to delete this product category?</p>
                    </div>
                    {
                        loading ?
                        <div className='flex items-center justify-center gap-3 mt-5 text-white w-full bg-gray-500 text-center rounded-md py-1'>
                            <p>Loading</p>
                        </div>
                        :
                        <div className='flex items-center gap-3 mt-5 text-white'>
                            <button className='bg-red-500 rounded-md py-1 w-full' onClick={() => setDeleteCategoryModal(false)}>No, Cancel</button>
                            <button className='bg-[#96BF47] rounded-md py-1 w-full' onClick={deleteCategory}>Yes, Conttnue</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteCategoryModal