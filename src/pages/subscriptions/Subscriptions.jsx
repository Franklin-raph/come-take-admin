import React, { useEffect, useState } from 'react'
import CreateSub from '../../components/create-sub/CreateSub'

const Subscriptions = () => {

    const [showSub, setShowSub] = useState('')
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [allSubs, setAllSubs] = useState([])
    const [loading, setLoading] = useState(false)

    async function getAllSubs(){
      const res = await fetch(`https://api.yamltech.com/subscription/plans`,{
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
                      <th scope="col" class="px-6 py-3">
                          Plan Description
                      </th>
                      <th scope="col" class="px-6 py-3">
                          No of Product to upload/month
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  allSubs.map((sub, index) => (
                      <tr class="bg-white border-b cursor-pointer">
                          <td class="pl-3 pr-6 py-4">
                            {index+1}
                          </td>
                          <td class="px-6 py-4 capitalize">
                            {sub.title}
                          </td>
                          <td class="px-6 py-4">
                            N{sub.price}
                          </td>
                          <td class='px-6 py-4 capitalize'>
                            {sub.plan_description}
                          </td>
                          <td class='px-6 py-4 capitalize'>
                            {sub.no_of_product_upload_per_month}
                          </td>
                      </tr>
                  ))
                }
              </tbody>
          </table>
      </div>
      {
        showSub && <CreateSub setShowSub={setShowSub}/>
      }
    </div>
  )
}

export default Subscriptions