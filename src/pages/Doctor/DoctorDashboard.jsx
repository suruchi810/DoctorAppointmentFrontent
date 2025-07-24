import React, { useContext, useMemo } from 'react';
import { IoIosPeople } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdContentPasteSearch } from "react-icons/md";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { DoctorContext } from '@/context/DoctorContext';

const fallbackImage = "https://via.placeholder.com/40";

const DoctorDashboard = () => {
  const { allAppointment, backendUrl } = useContext(DoctorContext);

  const totalEarning = useMemo(() => {
    return (allAppointment ?? [])
      .filter(appt => appt?.isCompleted)
      .reduce((sum, appt) => {
        const fee = Number(appt?.docData?.fees || 0);
        return sum + fee;
      }, 0);
  }, [allAppointment]);

  const totalAppointments = allAppointment?.length;

  const totalPatients = useMemo(() => {
    const patientIds = allAppointment?.map(a => a?.userData?._id).filter(Boolean);
    return new Set(patientIds).size;
  }, [allAppointment]);

  const lists = [
    { icon: <RiMoneyDollarCircleLine size={40} />, count: totalEarning, label: "Earning" },
    { icon: <MdContentPasteSearch size={40} />, count: totalAppointments, label: "Appointment" },
    { icon: <IoIosPeople size={40} />, count: totalPatients, label: "Patient" },
  ];

  // Age Calculator
  const getAgeFromDOB = (dobStr) => {
    if (!dobStr) return "N/A";
    const dob = new Date(dobStr);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    const dayDiff = now.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  return (
    <div className='flex-1 px-6 py-4'>
      <div className='h-full'>
        {/* Stat Cards */}
        <div className='grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-2'>
          {lists.map((item, index) => (
            <div key={index} className="col-span-1 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex gap-4 p-4">
                <div className="p-4 bg-gray-100 rounded-md text-blue-600">
                  {item.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-xl">{item.count}</p>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Appointments Table */}
        <div className='w-full py-10'>
          <div className='bg-white overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr. No.</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Date &amp; Time</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Fees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAppointment?.length > 0 ? (
                  [...allAppointment]
                    .reverse()
                    .slice(0, 5)
                    .map((item, index) => (
                      <TableRow key={item?._id || index}>
                        <TableCell>{index + 1}</TableCell>

                        {/* Patient */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={item?.userData?.image ? `${backendUrl}/images/${item.userData.image}` : fallbackImage}
                              alt={item?.userData?.name || "User"}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span>{item?.userData?.name ?? "Unknown"}</span>
                          </div>
                        </TableCell>

                        {/* Age */}
                        <TableCell>
                          {getAgeFromDOB(item?.userData?.dob)}
                        </TableCell>

                        {/* Date & Time */}
                        <TableCell>
                          {item?.slotDate || "N/A"}, {item?.slotTime || "N/A"}
                        </TableCell>

                        {/* Doctor */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={item?.docData?.image ? `${backendUrl}/images/${item.docData.image}` : fallbackImage}
                              alt={item?.docData?.name || "Doctor"}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span>{item?.docData?.name ?? "Unknown"}</span>
                          </div>
                        </TableCell>

                        {/* Fees */}
                        <TableCell>{item?.docData?.fees ?? "N/A"}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                      No recent appointments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
