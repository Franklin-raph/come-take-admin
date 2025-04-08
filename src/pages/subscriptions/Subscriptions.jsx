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

    async function getAllSubs(){
      const res = await fetch(`https://cometakebe-4t5h.onrender.com/subscription/plans`,{
        headers:{
          Authorization:`Bearer ${admin.data[0].access}`
        }
      })
      const data = await res.json()
      setAllSubs(data.data)
      console.log(data)
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
        <div class="relative overflow-x-auto sm:rounded-lg mt-9">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-[14px] text-[#5C5C5C] capitalize border-b">
                  <tr>
                      <th scope="col" class="pl-3 pr-6 py-3">
                          S/N
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Plan Title
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Plan Price
                      </th>
                      {/* <th scope="col" class="px-6 py-3">
                          Plan Description
                      </th> */}
                      <th scope="col" class="px-6 py-3">
                          No of Product to upload/month
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  allSubs.map((sub, index) => (
                      <tr class="bg-white border-b">
                          <td class="pl-3 pr-6 py-4">
                            {index+1}
                          </td>
                          <td class="px-6 py-4 capitalize">
                            {sub.title}
                          </td>
                          <td class="px-6 py-4">
                            N{sub.price}
                          </td>
                          {/* <td class='px-6 py-4 capitalize'>
                            {sub.plan_description}
                          </td> */}
                          <td class='px-6 py-4 capitalize'>
                            {sub.no_of_product_upload_per_month}
                          </td>
                          <td  class='px-6 py-4 capitalize flex items-center gap-5'>
                            <GoPencil className='text-yellow-500 cursor-pointer' onClick={() => setEditSubModal(sub)}/>
                            <p>Or</p>
                            <HiOutlineTrash className='text-red-500 cursor-pointer' onClick={() => setDeleteSubModal(sub.id)} />
                          </td>
                      </tr>
                  ))
                }
              </tbody>
          </table>
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