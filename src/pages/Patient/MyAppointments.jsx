import React, { useContext, useEffect, useState } from 'react'
import { PatientContext } from '@/context/PatientContext';
import axios from 'axios';

const MyAppointments = () => {
  const { backendUrl, token, fetchDoctorsData } = useContext(PatientContext);
  const [appointments, setAppointments] = useState(null);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        setAppointments(response.data.appointments);
      }

    } catch (error) {
      console.log("Error", error);
    }
  }

  const handleCancellation = async (id) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId: id }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.success) {
        console.log(data.message);
        fetchAllData();
        fetchDoctorsData();
      }
    } catch (error) {
      console.log("Error");

    }
  }

  useEffect(() => {
    fetchAllData();
  }, [])

  return (
    <div className='mt-5 px-4 sm:px-8'>
      <p className='text-[20px] sm:text-[24px] font-bold text-[#4B5563]'>My Appointment</p>
      <div className='flex flex-col justify-center'>
        {
          appointments?.map((item, idx) => (
            <div key={idx} className='border-b border-b-gray-400 p-4'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex justify-center sm:block'>
                  <img src={`${backendUrl}/images/${item?.docData?.image}`} alt="" className='h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] bg-gray-50 object-cover' />
                </div>
                <div className='flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-0'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-[20px] sm:text-[24px] font-bold text-[#4B5563]'>{item?.docData?.name}</p>
                    <p className='text-[#4B5563]'>{item?.docData?.speciality}</p>
                    <b className='text-[#4B5563]'>Address</b>
                    <p className='text-[#4B5563]'>{item?.docData?.address?.line1}</p>
                    <p className='text-[#4B5563]'>{item?.docData?.address?.line2}</p>
                    <p className='text-[#4B5563]'>Date & Time: {item?.slotDate} | {item.slotTime}</p>
                  </div>

                  <div className='flex flex-col sm:justify-end gap-2 sm:gap-4'>
                    {!item?.cancelled ? (
                      <>
                        <button className='bg-indigo-600 rounded-[5px] text-white border border-indigo-600 px-4 py-2'>Pay here</button>
                        <button onClick={() => handleCancellation(item._id)} className='rounded-[5px] border border-gray-400 px-4 py-2 hover:bg-red-600 hover:text-white'>Cancel Appointment</button>
                      </>

                    ) : <div className='text-bold text-red-600 rounded-[5px] border px-4 py-2'>appointment cancelled</div>}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments;
