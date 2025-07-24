import React from 'react'
import about_page from '../../assets/assets_frontend/about_image.png'

const About = () => {
  return (
    <div className='flex flex-col gap-4'>

      <div className='text-[30px] text-center text-[#4B5563] font-bold'>About</div>

      <div className='flex flex-col w-full lg:flex-row md:flex-row'>
        <div className='lg:w-1/3 p-[20px]'>
          <img src={about_page} alt="" className='' />
        </div>
        <div className='flex flex-col gap-4 lg:w-2/3 w-full mt-5'>
          <p>Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto,
            we understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.</p>

          <p>Prescripto is committed to excellence in healthcare technology.
            We continuously strive to enhance our platform, integrating the
            latest advancements to improve user experience and deliver
            superior service. Whether you're booking your first appointment
            or managing ongoing care, Prescripto is here to support you every
            step of the way.</p>

          <b className='mt-6'>Our Vision</b>

          <p>Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between
            patients and healthcare providers, making it easier for you
            to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        <div className='border border-gray-400 p-10 gap-2 hover:bg-indigo-600 cursor-pointer transition-all duration-300 group'>
          <p className='text-[18px] text-black font-bold group-hover:text-white'>Efficiency:</p>
          <p className='text-[18px] text-[#4B5563] group-hover:text-white'>
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        <div className='border border-gray-400 p-10 gap-2 hover:bg-indigo-600 cursor-pointer transition-all duration-300 group'>
          <p className='text-[18px] text-black font-bold group-hover:text-white'>Convenience:</p>
          <p className='text-[18px] text-[#4B5563] group-hover:text-white'>
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>

        <div className='border border-gray-400 p-10 gap-2 group hover:bg-indigo-600 cursor-pointer transition-all duration-300'>
          <p className='text-[18px] text-black font-bold group-hover:text-white'>Personalization:</p>
          <p className='text-[18px] text-[#4B5563] group-hover:text-white'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About