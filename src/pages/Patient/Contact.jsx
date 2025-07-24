import React from 'react'
import contact_page from '../../assets/assets_frontend/contact_image.png'

const Contact = () => {
  return (
    <div className='flex flex-col gap-6 mt-[50px] items-center'>
      <p className='text-center font-bold text-[30px] text-[#4B5563]'>CONTACT Us</p>
      <div className='flex flex-col lg:flex-row items-center gap-6'>
        <div>
          <img src={contact_page} alt="" className='h-[560px] w-[560px]' />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-[#4B5563] text-[24px] font-bold'>Our OFFICE</p>
          <div className='flex flex-col gap-2'>
            <p className='text-[#4B5563]'>54709 Willms Station</p>
            <p className='text-[#4B5563]'>Suite 350, Washington, USA</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-[#4B5563]'>Tel: (415) 555‑0132</p>
            <p className='text-[#4B5563]'>Email: greatstackdev@gmail.com</p>
          </div>

          <p className='text-[#4B5563] text-[24px] font-bold'>Careers at PRESCRIPTO</p>
          <p className='text-[#4B5563]'>Learn more about our teams and job openings.</p>
          <p><button className='text-[#1F2937] border border-gray-300 px-4 py-3 cursor-pointer'>Explore Jobs</button></p>
        </div>
      </div>
    </div>
  )
}

export default Contact