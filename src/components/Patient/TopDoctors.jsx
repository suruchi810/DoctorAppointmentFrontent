import { PatientContext } from '@/context/PatientContext';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';;

const TopDoctors = () => {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL;
    const {doctors} = useContext(PatientContext);
    return (
        <div className='z-15 flex flex-col items-center gap-3 my-13  md:mx-10'>
            <h1 className='text-[40px] text-gray-900 font-medium'>Top Doctors to Book</h1>
            <p className='text-[18px] text-[#4B5563]'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                {doctors?.slice(0, 8).map((item, idx) => (
                    <div key={idx} onClick={()=>navigate(`/appointment/${item._id}`)} className='bg-white shadow-md p-4 cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1 hover: z-10'>
                        <div className='bg-blue-50'><img src={`${url}/images/${item.image}`} alt="" /></div>
                        <div className='py-4'>
                            <div className='flex items-center px-2'><p className='h-2 w-2 rounded-full bg-green-500'></p><p className='text-[15px] text-[#0FBF00] px-2'>Available</p></div>
                            <p className='text-[22px] px-2'>{item.name}</p>
                            <p className='text-[15px] text-[#4B5563] px-2'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center py-[80px]">
                <button onClick={()=>{navigate('/doctors'); scrollTo(0, 0)}} 
                className='bg-gray-100 w-[200px] py-4 rounded-[50px]'>
                    more
                </button>
            </div>
        </div>
    )
}

export default TopDoctors
