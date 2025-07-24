import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table"
import { CiCircleRemove } from "react-icons/ci"
import axios from 'axios'
import { AdminContext } from '@/context/AdminContext'

const AllAppointments = () => {

  const { backendUrl, aToken, allAppointments, setAllAppointments } = useContext(AdminContext);

  const handleAppointment = async (appointmentId) => {
    try {
      const res = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {appointmentId}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aToken}`,
        }
      });
      if(res.data.success){
        getAllAppointments();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  function getAgeFromDOB(dobStr, referenceDateStr = '2025-06-20') {
    const dob = new Date(dobStr);
    const referenceDate = new Date(referenceDateStr);

    let age = referenceDate.getFullYear() - dob.getFullYear();
    const monthDiff = referenceDate.getMonth() - dob.getMonth();
    const dayDiff = referenceDate.getDate() - dob.getDate();


    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  return (
    <div className='w-full p-10'>
      <h1 className='text-[30px] font-bold text-[#4B5563] py-4'>All Appointments</h1>
      <div className='bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppointments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={`${backendUrl}/images/${item?.userData.image}`}
                      alt={item?.userData.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{item?.userData?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{getAgeFromDOB(item?.userData?.dob)}</TableCell>
                <TableCell>{item?.slotDate}, {item?.slotTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={`${backendUrl}/images/${item?.docData?.image}`}
                      alt={item?.docData?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{item?.docData?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item?.docData?.fees}</TableCell>
                <TableCell>
                  {item?.cancelled ? (<div className='text-red-600'>Cancelled</div>) : (<button onClick={() => handleAppointment(item?._id)} className="text-red-600 hover:text-red-800 transition">
                    <CiCircleRemove size={26} />
                  </button>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AllAppointments
