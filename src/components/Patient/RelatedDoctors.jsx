import { PatientContext } from '@/context/PatientContext';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    const navigate = useNavigate();
    const { doctors } = useContext(PatientContext);
    const [relDoc, setRelDoc] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        let doctorsData = [];
        if (doctors.length > 0 && speciality) {
            doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
        }
        setRelDoc(doctorsData);
    }, [doctors, speciality, docId])

    return (

        <div className='mt-[80px] flex flex-col items-center'>
        <p className='text-[40px] font-bold'>Related Doctors</p>
        <p className='text-[#4B5563]'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
            {relDoc.map((item, idx) => (
                <div key={idx} onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0, 0)}} className='bg-white shadow-md p-4 cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1'>
                    <div className='bg-blue-50'><img src={`${url}/images/${item.image}`} alt="img" /></div>
                    <div className='py-4'>
                        <div className='flex items-center px-2'><p className='h-2 w-2 rounded-full bg-green-500'></p><p className='text-[15px] text-[#0FBF00] px-2'>Available</p></div>
                        <p className='text-[22px] px-2'>{item.name}</p>
                        <p className='text-[15px] text-[#4B5563] px-2'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default RelatedDoctors