import React, { useEffect, useState } from 'react'

const Transactions = () => {

  // const transactionsArray = ['All', 'Confirmed', 'Pending', 'Failed']

  const admin = JSON.parse(localStorage.getItem('admin'))
  const [allTransactions, setAllTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchString, setSearchString] = useState('');

  async function getAllTransactions(){
    setLoading(true)
    const res = await fetch(`https://cometakebe-4t5h.onrender.com/administrator/dashboard/transactions`,{
      headers:{
        Authorization:`Bearer ${admin.data[0].access}`
      }
    })
    if(res) setLoading(false)
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
      <div className="relative overflow-x-auto sm:rounded-lg mt-9">
          {loading ? (
            <div className='flex justify-center items-center py-20 w-full'>
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <p className='text-[#333333] text-[16px] font-[500]'>Loading...</p>
            </div>
          ) : allTransactions.length === 0 ? (
            <div className='flex flex-col justify-center items-center py-20 w-full'>
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className='text-[#333333] text-[18px] font-[500]'>No transactions available</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-[14px] text-[#5C5C5C] capitalize border-b">
                    <tr>
                        <th scope="col" className="pl-3 pr-6 py-3">
                            Customers
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transaction Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transaction Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Balance
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    allTransactions.filter(transaction => transaction?.wallet?.user?.first_name.toLowerCase().includes(searchString.toLowerCase()) || transaction?.wallet?.user?.last_name.toLowerCase().includes(searchString.toLowerCase()))
                    .map(transaction => (

                      <tr className="bg-white border-b cursor-pointer" key={transaction.id || transaction._id}>
                          <td className="pl-3 pr-6 py-4">
                            {transaction?.wallet?.user?.first_name} {transaction?.wallet?.user?.last_name}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </td>
                          <td className='px-6 py-4 capitalize'>
                            #{transaction.amount.toLocaleString()}
                          </td>
                          <td className='px-6 py-4 capitalize'>
                            <span className={`py-1 px-6 rounded-full text-gray-100 ${transaction.transaction_type === 'debit' ? 'bg-red-300' : 'bg-green-300'}`}>{transaction.transaction_type}</span>
                          </td>
                          <td className="px-6 py-4 capitalize">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4">
                            #{transaction?.wallet?.balance?.toLocaleString()}
                          </td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
          )}
      </div>
    </div>
  )
}

export default Transactions