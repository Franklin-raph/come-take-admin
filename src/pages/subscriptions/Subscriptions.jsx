import React, { useState } from 'react'
import CreateSub from '../../components/create-sub/CreateSub'

const Subscriptions = () => {

    const [showSub, setShowSub] = useState('')
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
                          Customers
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Amount
                      </th>
                      <th scope="col" class="px-6 py-3">
                          MOP
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b cursor-pointer">
                      <td class="pl-3 pr-6 py-4">
                        Tosin Olawale
                      </td>
                      <td class="px-6 py-4">
                        <span className='bg-green-300 py-1 px-6 text-green-700 rounded-full'>Confirmed</span>
                      </td>
                      <td class="px-6 py-4">
                        11/10/2023
                      </td>
                      <td class='px-6 py-4 capitalize'>
                        N10,000
                      </td>
                      <td class="px-6 py-4">
                        Credit Card
                      </td>
                  </tr>
                  <tr class="bg-white border-b cursor-pointer">
                      <td class="pl-3 pr-6 py-4">
                        Tosin Olawale
                      </td>
                      <td class="px-6 py-4">
                        <span className='bg-green-300 py-1 px-6 text-green-700 rounded-full'>Confirmed</span>
                      </td>
                      <td class="px-6 py-4">
                        11/10/2023
                      </td>
                      <td class='px-6 py-4 capitalize'>
                        N10,000
                      </td>
                      <td class="px-6 py-4">
                        Credit Card
                      </td>
                  </tr>
                  <tr class="bg-white border-b cursor-pointer">
                      <td class="pl-3 pr-6 py-4">
                        Tosin Olawale
                      </td>
                      <td class="px-6 py-4">
                        <span className='bg-red-500 py-1 px-6 text-red-900 rounded-full'>Failed</span>
                      </td>
                      <td class="px-6 py-4">
                        11/10/2023
                      </td>
                      <td class='px-6 py-4 capitalize'>
                        N10,000
                      </td>
                      <td class="px-6 py-4">
                        Credit Card
                      </td>
                  </tr>
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