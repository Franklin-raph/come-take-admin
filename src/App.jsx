import './App.css'
import SideNav from './components/sideNav/SideNav'
import { HashRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/topNav/TopNav'
import Customers from './pages/customers/Customers'

function App() {

  return (
    <HashRouter>
      <TopNav />
      <div className='flex items-center'>
        <SideNav />
        <div className='w-[80%] bg-[#f6f6f6] pt-[6rem] ml-auto px-[3rem] h-[100dvh]'>
          <Routes>
            <Route path='/customers' element={<Customers />}/>
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
