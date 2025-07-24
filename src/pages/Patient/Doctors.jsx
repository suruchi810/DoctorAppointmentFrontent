import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PatientContext } from './../../context/PatientContext';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [fiterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(PatientContext);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doctor) => doctor.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality, doctors])

  return (
    <section>
      <p>Browse through the doctors specialist.</p>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div>
          <p onClick={()=>navigate('/doctors/General physician')} className={`w-[240px] text-[20px] px-4 border my-3 cursor-pointer ${speciality === 'General physician'? 'bg-indigo-50 text-black':''}`}>General physician</p>
          <p onClick={()=>navigate('/doctors/Gynecologist')} className={`w-[240px] text-[20px] px-4 border my-3 cursor-pointer ${speciality === 'Gynecologist'?'bg-indigo-50 text-black':''}`}>Gynecologist</p>
          <p onClick={()=>navigate('/doctors/Dermatologist')} className={`w-[240px] text-[20px] px-4 border my-3 cursor-pointer ${speciality === 'Dermatologist'?'bg-indigo-50 text-black':''}`}>Dermatologist</p>
          <p onClick={()=>navigate('/doctors/Pediatricians')} className={`w-[240px] text-[20px] px-4 border my-3 cursor-pointer ${speciality === 'Pediatricians'?'bg-indigo-50 text-black':''}`}>Pediatricians</p>
          <p onClick={()=>navigate('/doctors/Neurologist')} className={`w-[240px] text-[20px] px-4 border my-3 cursor-pointer ${speciality === 'Neurologist'?'bg-indigo-50 text-black':''}`}>Neurologist</p>
          <p onClick={()=>navigate('/doctors/Gastroenterologist')} className={`w-[240px] text-[20px] px-4 border my-3 cursor-pointer ${speciality === 'Gastroenterologist'?'bg-indigo-50 text-black':''}`}>Gastroenterologist</p>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
          {fiterDoc?.map((item, idx) => (
            <div key={idx} onClick={() => navigate(`/appointment/${item._id}`)} className='bg-white shadow-md p-4 cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1'>
              <div className='bg-blue-50'><img src={`${url}/images/${item.image}`} alt="" /></div>
              <div className='py-4'>
                <div className='flex items-center px-2'><p className='h-2 w-2 rounded-full bg-green-500'></p><p className='text-[15px] text-[#0FBF00] px-2'>Available</p></div>
                <p className='text-[22px] px-2'>{item.name}</p>
                <p className='text-[15px] text-[#4B5563] px-2'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Doctors