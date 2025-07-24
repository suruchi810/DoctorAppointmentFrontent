import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PatientLogin = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = (e) => {
    e.preventDefault();

    
  }

  return (
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Email</label>
          <input type="text" value={userData.email} onChange={(e) => setUserData(e.target.value)} className='w-full py-2 px-4 bg-gray-50 border border-gray-300' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Password</label>
          <input type="password" value={userData.password} onChange={(e) => setUserData(e.target.value)} className='w-full py-2 px-4 bg-gray-50 border border-gray-300' />
        </div>
        <button onClick={handleLogin} className='bg-blue-500 rounded-[5px] py-2'>Login</button>
        <p>Don't have an account? <span onClick={() => navigate('/patient-signup')} className='text-blue-700 cursor-pointer'>Signup here</span></p>
      </div>
  )
}

export default PatientLogin