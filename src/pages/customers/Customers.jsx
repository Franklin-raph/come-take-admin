import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Customers = ({ baseUrl }) => {
  const filterArray = ['All', 'Inactive', 'Active'];
  const [searchString, setSearchString] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [allCustomers, setAllCustomers] = useState([]);
  const [originalCustomers, setOriginalCustomers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const admin = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();

  const usersPerPage = 5;
  const visitedPages = pageNumber * usersPerPage;

  async function getAllCustomers() {
    try {
      const res = await fetch(`${baseUrl}/dashboard/all-customers`, {
        headers: {
          Authorization: `Bearer ${admin.data[0].access}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setAllCustomers(data.data.reverse());
        setOriginalCustomers(data.data.reverse());
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }

  useEffect(() => {
    if (!admin) {
      navigate('/admin-login');
      return;
    }
    getAllCustomers();
  }, []);

  // Combined filtering function that handles both search and active/inactive filters
  useEffect(() => {
    let filteredData = [...originalCustomers];

    // Apply active/inactive filter
    if (activeFilter !== 'All') {
      filteredData = filteredData.filter(customer => 
        activeFilter === 'Active' ? customer.is_active : !customer.is_active
      );
    }

    // Apply search filter
    if (searchString) {
      filteredData = filteredData.filter(customer => 
        customer.first_name?.toLowerCase().includes(searchString.toLowerCase()) ||
        customer.last_name?.toLowerCase().includes(searchString.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    setAllCustomers(filteredData);
    setPageNumber(0); // Reset to first page when filters change
  }, [searchString, activeFilter, originalCustomers]);

  const displayUsers = allCustomers
    .slice(visitedPages, visitedPages + usersPerPage)
    .map((customer, index) => (
      <tr 
        key={customer.id}
        className="bg-white border-b cursor-pointer" 
        onClick={() => navigate(`/customer/${customer.id}`)}
      >
        <td className="pl-3 pr-6 py-4">
          {visitedPages + index + 1}
        </td>
        <td className="pl-3 pr-6 py-4">
          {customer.first_name} {customer.last_name}
        </td>
        <td className="px-6 py-4">
          {new Date(customer.date_joined).toDateString()}
        </td>
        <td className="px-6 py-4">
          {new Date(customer.last_seen).toDateString()}
        </td>
        <td className={`px-6 py-4 capitalize ${
          customer.kyc_status === 'not_set' ? 'text-gray-500' :
          customer.kyc_status === 'pending' ? 'text-yellow-500' :
          customer.kyc_status === 'rejected' ? 'text-red-500' : 'text-green-500'
        }`}>
          {customer.kyc_status}
        </td>
        <td className="px-6 py-4">{customer.email}</td>
        <td className="px-6 py-4">{customer.phone}</td>
        <td className="px-6 py-4">{customer.is_active.toString()}</td>
      </tr>
    ));

  const pageCount = Math.ceil(allCustomers.length / usersPerPage);

  return (
    <div className="shadow bg-white rounded-[20px] p-[30px]">
      <p className="text-[#333333] text-[20px] font-[700]">
        Customers <span className="text-[#A1A1A1] font-[400]">({allCustomers?.length})</span>
      </p>
      <div className="rounded-[8px] border-2 border-[#DCDCDC] p-[30px] mt-3">
        <div className="flex items-center gap-[12px]">
          {filterArray.map(filter => (
            <p
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-1 w-[100px] text-center cursor-pointer text-[14px] rounded-full ${
                activeFilter === filter
                  ? 'bg-secondary-color text-white'
                  : 'bg-[#EBEBEB] text-[#A1A1A1]'
              }`}
            >
              {filter}
            </p>
          ))}
        </div>
        <div className="mt-10">
          <p className="text-[#101010]">Search by name/email</p>
          <input
            className="border outline-none border-[#C8C8C8] px-2 py-[6px] mt-[6px] rounded text-[14px]"
            onChange={e => setSearchString(e.target.value)}
            type="text"
            placeholder="Customer Name"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg mt-9">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-[14px] text-[#5C5C5C] capitalize border-b">
            <tr>
              <th scope="col" className="pl-3 pr-6 py-3">S/N</th>
              <th scope="col" className="pl-3 pr-6 py-3">Customers</th>
              <th scope="col" className="px-6 py-3">Creation Date</th>
              <th scope="col" className="px-6 py-3">Last Visited</th>
              <th scope="col" className="px-6 py-3">Is Seller</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Is Active</th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </table>
        <ReactPaginate
          previousLabel="Prev"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={({ selected }) => setPageNumber(selected)}
          containerClassName="flex items-center gap-9 mt-5 justify-end pr-[30px] paginationBtns"
          activeClassName="bg-secondary-color text-white"
          disabledClassName="bg-gray-500 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Customers;