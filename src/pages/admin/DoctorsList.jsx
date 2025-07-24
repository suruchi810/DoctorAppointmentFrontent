import { AdminContext } from '@/context/AdminContext';
import React from 'react'
import { useContext } from 'react';

const DoctorsList = () => {
  const { backendUrl, doctors,} = useContext(AdminContext);

  return (
    <div className='w-full h-full py-6 px-4'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        {doctors?.map((item, idx) => (
          <div key={idx} className='bg-white shadow-md p-4 cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1'>
            <div className='bg-blue-50'><img src={`${backendUrl}/images/${item.image}`} alt="" className='h-[200px] w-[400px]' /></div>
            <div className='py-4'>
              <p className='text-[22px] px-2'>{item.name}</p>
              <p className='text-[15px] text-[#4B5563] px-2'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList