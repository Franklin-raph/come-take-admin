import React, { useEffect, useState } from 'react'
import CreateSub from '../../components/create-sub/CreateSub'
import { HiOutlineTrash } from "react-icons/hi2";
import { GoPencil } from "react-icons/go";
import DeleteSubModal from '../../components/delete-sub-modal/DeleteSubModal';
import EditSubModal from '../../components/edit-sub-modal/EditSubModal';


const Subscriptions = () => {

    const [showSub, setShowSub] = useState('')
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [allSubs, setAllSubs] = useState([])
    const [editSubModal, setEditSubModal] = useState(false)
    const [deleteSubModal, setDeleteSubModal] = useState(false)
    const [loading, setLoading] = useState(false)

    async function getAllSubs(){
      setLoading(true)
      try {
        const res = await fetch(`https://cometakebe-4t5h.onrender.com/subscription/plans`,{
          headers:{
            Authorization:`Bearer ${admin.data[0].access}`
          }
        })
        const data = await res.json()
        setAllSubs(data.data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      getAllSubs()
    },[])
    
  return (
    <div>
        <div className='flex items-center justify-between'>
            <p>Available Subscriptions</p>
            <button className='bg-primary-color text-white px-3 py-1 rounded-full' onClick={() => setShowSub(true)}>Create New Subscription</button>
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
          ) : allSubs.length === 0 ? (
            <div className='flex flex-col justify-center items-center py-20 w-full'>
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className='text-[#333333] text-[18px] font-[500]'>No subscriptions available</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-[14px] text-[#5C5C5C] capitalize border-b">
                    <tr>
                        <th scope="col" className="pl-3 pr-6 py-3">
                            S/N
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Plan Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Plan Price
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Plan Description
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            No of Product to upload/month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    allSubs.map((sub, index) => (
                        <tr className="bg-white border-b" key={sub.id || index}>
                            <td className="pl-3 pr-6 py-4">
                              {index+1}
                            </td>
                            <td className="px-6 py-4 capitalize">
                              {sub.title}
                            </td>
                            <td className="px-6 py-4">
                              N{sub.price}
                            </td>
                            {/* <td className='px-6 py-4 capitalize'>
                              {sub.plan_description}
                            </td> */}
                            <td className='px-6 py-4 capitalize'>
                              {sub.no_of_product_upload_per_month}
                            </td>
                            <td className='px-6 py-4 capitalize flex items-center gap-5'>
                              <GoPencil className='text-yellow-500 cursor-pointer' onClick={() => setEditSubModal(sub)}/>
                              <p>Or</p>
                              <HiOutlineTrash className='text-red-500 cursor-pointer' onClick={() => setDeleteSubModal(sub.id)} />
                            </td>
                        </tr>
                    ))
                  }
                </tbody>
            </table>
          )}
        </div>
        {
          showSub && <CreateSub setShowSub={setShowSub} getAllSubs={getAllSubs}/>
        }
        {
          deleteSubModal && <DeleteSubModal setDeleteSubModal={setDeleteSubModal} deleteSubModal={deleteSubModal} getAllSubs={getAllSubs}/>
        }
        {
          editSubModal && <EditSubModal getAllSubs={getAllSubs} editSubModal={editSubModal} setEditSubModal={setEditSubModal}/>
        }
    </div>
  )
}

export default Subscriptions