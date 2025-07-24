import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Shape_logo from '../../assets/assets_frontend/Shape.png'
import { PatientContext } from '@/context/PatientContext'
import RelatedDoctors from '@/components/Patient/RelatedDoctors'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, backendUrl, token } = useContext(PatientContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docSlot, setDocSlot] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [slotTime, setSlotTime] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = () => {
    const today = new Date()
    const slots = []

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        const hourNow = today.getHours()
        const minNow = today.getMinutes()

        if (hourNow >= 21) continue

        currentDate.setHours(hourNow >= 10 ? hourNow + 1 : 10)
        currentDate.setMinutes(minNow > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime

        const isSlotAvailable = docInfo?.slots_booked[slotDate] && docInfo?.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        slots.push(timeSlots);
      }

    }
    setDocSlot(slots)
  }

  const handleAppointment = async () => {
    try {
      const date = docSlot[selectedIdx][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;

      const res = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (res.data.success) {
        alert("Booked Appointment");
        navigate('/my-appointments');
      } else {
        alert(res.data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.log("Error", error);
      alert("Something went wrong while booking.");
    }
  };


  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);


  return docInfo ? (
    <div className='flex flex-col gap-6 mt-12 px-4'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='w-full md:w-[350px]'>
          <img
            src={`${backendUrl}/images/${docInfo.image}`}
            className='bg-[#5F6FFF] w-full h-[250px] md:h-[280px] object-cover rounded-xl'
            alt='Doctor'
          />
        </div>

        <div className='flex-1'>
          <div className='border border-gray-300 rounded-xl p-4 sm:p-6'>
            <p className='text-2xl sm:text-3xl font-medium'>{docInfo.name}</p>
            <div className='flex flex-wrap items-center gap-2 mt-2 text-sm sm:text-base text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <span className='border border-gray-200 rounded-lg px-2 py-1 text-xs sm:text-sm'>
                {docInfo.experience}
              </span>
            </div>

            <div className='flex items-center gap-1 mt-4'>
              <p className='text-black font-bold text-sm'>About</p>
              <img src={Shape_logo} alt='About' className='h-5 w-5' />
            </div>

            <p className='text-sm text-gray-600 mt-2'>{docInfo.about}</p>

            <p className='text-gray-700 mt-4'>
              Appointment fee:{' '}
              <span className='text-black font-bold'>${docInfo.fees}</span>
            </p>
          </div>

          <div className='mt-6'>
            <p className='text-xl sm:text-2xl text-gray-700 mb-4'>Booking slots</p>

            <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-3'>
              {docSlot.map((item, idx) => (
                <div key={idx}>
                  <div
                    onClick={() => setSelectedIdx(idx)}
                    className={`min-w-[60px] p-3 border text-center rounded-xl cursor-pointer transition ${selectedIdx === idx
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    <p className='text-xs font-medium'>
                      {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                    </p>
                    <p className='text-sm'>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 overflow-x-auto max-w-[465px] scrollbar-hide'>
              <div className='flex gap-3'>
                {docSlot[selectedIdx] &&
                  docSlot[selectedIdx].map((slot, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSlotTime(slot.time);
                        setSelectedTimeSlot(i);
                      }}
                      className={`flex-shrink-0 px-4 py-2 text-sm rounded-xl cursor-pointer border transition whitespace-nowrap ${slot.time === slotTime
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-gray-100 text-black border-gray-300 hover:bg-indigo-100'
                        }`}
                    >
                      {slot.time}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <button onClick={handleAppointment} className='bg-indigo-600 text-white px-6 py-2 rounded-2xl text-sm sm:text-base hover:bg-indigo-700 transition'>
              Book an appointment
            </button>
          </div>

        </div>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  ) : null
}

export default Appointment
