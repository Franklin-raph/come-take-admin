import './App.css'
import SideNav from './components/sideNav/SideNav'
import { HashRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/topNav/TopNav'
import Customers from './pages/customers/Customers'
import Settings from './pages/settings/Settings'
import AdminLogin from './pages/AdminLogin/AdminLogin'
import SingleCustomer from './pages/singleCustomer/SingleCustomer'

function App() {

  const baseUrl = 'https://cometake.pythonanywhere.com/administrator'
  const admin = JSON.parse(localStorage.getItem('admin'))

  return (
    <HashRouter>
      {admin && <TopNav />}
      <div className='flex items-center'>
        {admin && <SideNav />}
        <div className={admin ? `w-[85%] bg-[#f6f6f6] pt-[6rem] ml-auto px-[1.5rem] h-[100dvh]` : 'w-[100%]'}>
          <Routes>
            <Route path='/' element={<Customers baseUrl={baseUrl}/>}/>
            <Route path='/customers' element={<Customers baseUrl={baseUrl}/>}/>
            <Route path='/admin-login' element={<AdminLogin baseUrl={baseUrl}/>}/>
            <Route path='/settings' element={<Settings baseUrl={baseUrl}/>}/>
            <Route path='/customer/:id' element={<SingleCustomer baseUrl={baseUrl}/>}/>
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
