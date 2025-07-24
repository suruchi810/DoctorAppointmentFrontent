import React, { useContext } from 'react'
import admin_logo from '../../assets/assets_admin/admin_logo.svg'
import { AdminContext } from '@/context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const {aToken, setAToken} = useContext(AdminContext);

  const handleLogout = () => {
    setAToken('');
    localStorage.removeItem('aToken')
    console.log("aToken", aToken);
    
  }

  return (
    <nav className='h-[60px] border-b border-gray-400 flex justify-between items-center lg:px-[40px] px-[20px]'>
        <div className='flex items-center gap-2'>
            <img src={admin_logo} alt="" className='w-[180px]'/>
            <p className='border border-gray-400 w-fit rounded-3xl py-1 px-2 text-xs'>Admin</p>
        </div>
        <div>
            {aToken ? <button onClick={handleLogout} className='bg-indigo-600 text-white rounded-2xl py-2 px-3 text-lg'>Logout</button>:(<button className='bg-indigo-600 text-white rounded-2xl py-2 px-3 text-lg'>Login</button>)}
        </div>
    </nav>
  )
}

export default AdminNavbar