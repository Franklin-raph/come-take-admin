import React, { useEffect, useState } from 'react'
import CustomerDropDown from '../../components/customer-drop-down/CustomerDropDown'

const Customers = ({baseUrl}) => {

  const filterArray = ['All', 'Inactive', 'Active', 'Premium']
  const [showCustomerDropDown, setShowCustomerDropDown] = useState(false)
  const admin = JSON.parse(localStorage.getItem('admin'))

  async function getAllCustomers(){
    const res = await fetch(`${baseUrl}/dashboard/all-customers`,{
      // headers:{
      //   Authorization:``
      // }
    })
    const data = await res.json()
    console.log(res, data);
  }

  useEffect(() =>{
    getAllCustomers()
  },[])

  return (
    <div className='shadow bg-white rounded-[20px] p-[30px] h-[100%]'>
      <p className='text-[#333333] text-[20px] font-[700]'>Customers <span className='text-[#A1A1A1] font-[400]'>(245)</span> </p>
      <div className='rounded-[8px] border-2 border-[#DCDCDC] p-[30px] mt-3'>
        <div className='flex items-center gap-[12px]'>
          {
            filterArray.map(filter => (
              <p className='bg-[#EBEBEB] py-1 w-[100px] text-center cursor-pointer text-[#A1A1A1] text-[14px] rounded-full'>{filter}</p>
            ))
          }
        </div>
        <div className='mt-10'>
          <p className='text-[#101010]'>Search by name</p>
          <input className='border outline-none border-[#C8C8C8] px-2 py-[6px] mt-[6px] rounded text-[14px]' type="text" placeholder='Customer Name' />
        </div>
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg mt-9">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-[14px] text-[#5C5C5C] capitalize border-b">
                  <tr>
                      <th scope="col" class="pl-3 pr-6 py-3">
                          Customers
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Creation Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Last Visited
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Phone
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b ">
                      <td class="pl-3 pr-6 py-4">
                          Microsoft Surface Pro
                      </td>
                      <td class="px-6 py-4">
                          Silver
                      </td>
                      <td class="px-6 py-4">
                          Laptop
                      </td>
                      <td class="px-6 py-4">
                          $2999
                      </td>
                      <td class="px-6 py-4">
                          $2999
                      </td>
                      <td class="px-1 py-4 cursor-pointer" onClick={() => setShowCustomerDropDown(!showCustomerDropDown)}>
                        :
                      </td>
                      {
                        showCustomerDropDown &&
                        <div className='absolute top-[50px] right-[15px]'>
                          <CustomerDropDown />
                        </div>
                      }
                  </tr>
              </tbody>
          </table>
      </div>

    </div>
  )
}

export default Customers