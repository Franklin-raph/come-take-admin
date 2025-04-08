import React, { useEffect, useState } from 'react'

const Transactions = () => {

  // const transactionsArray = ['All', 'Confirmed', 'Pending', 'Failed']

  const admin = JSON.parse(localStorage.getItem('admin'))
  const [allTransactions, setAllTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchString, setSearchString] = useState('');

  async function getAllTransactions(){
    const res = await fetch(`https://cometakebe-4t5h.onrender.com/administrator/dashboard/transactions`,{
      headers:{
        Authorization:`Bearer ${admin.data[0].access}`
      }
    })
    const data = await res.json()
    setAllTransactions(data.data)
    console.log(data)
  }

  useEffect(() => {
    getAllTransactions()
  },[])

  return (
    <div className='shadow bg-white rounded-[20px] p-[30px]'>
      <p className='text-[#333333] text-[20px] font-[700]'>Transactions</p>
      <div className='rounded-[8px] border border-[#DCDCDC] p-[30px] mt-3'>
        {/* <div className='flex items-center gap-[12px]'>
          {
            transactionsArray.map(transaction => (
              <p className='bg-[#EBEBEB] py-1 w-[100px] text-center cursor-pointer text-[#A1A1A1] text-[14px] rounded-full'>{transaction}</p>
            ))
          }
        </div> */}
        <div className='mt-10'>
          <p className='text-[#101010]'>Search by name</p>
          <input onChange={e => setSearchString(e.target.value)} className='border outline-none border-[#C8C8C8] px-2 py-[6px] mt-[6px] rounded text-[14px]' type="text" placeholder='Customer Name' />
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
                          Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Amount
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Transaction Type
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Transaction Description
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Balance
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  allTransactions.filter(transaction => transaction?.wallet?.user?.first_name.toLowerCase().includes(searchString.toLowerCase()) || transaction?.wallet?.user?.last_name.toLowerCase().includes(searchString.toLowerCase()))
                  .map(transaction => (

                    <tr class="bg-white border-b cursor-pointer">
                        <td class="pl-3 pr-6 py-4">
                          {transaction?.wallet?.user?.first_name} {transaction?.wallet?.user?.last_name}
                        </td>
                        <td class="px-6 py-4">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </td>
                        <td class='px-6 py-4 capitalize'>
                          #{transaction.amount.toLocaleString()}
                        </td>
                        <td class='px-6 py-4 capitalize'>
                          <span class={` py-1 px-6 rounded-full text-gray-100 ${transaction.transaction_type === 'debit' ? 'bg-red-300' : 'bg-green-300'}`}>{transaction.transaction_type}</span>
                        </td>
                        <td class="px-6 py-4 capitalize">
                          {transaction.description}
                        </td>
                        <td class="px-6 py-4">
                          #{transaction?.wallet?.balance?.toLocaleString()}
                        </td>
                    </tr>
                  ))
                }
                  {/* <tr class="bg-white border-b cursor-pointer">
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
                  </tr> */}
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default Transactions