import React, { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdContentPasteSearch } from "react-icons/md";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";

const fallbackImage = "https://via.placeholder.com/40";

const AdminDashboard = () => {
  const { allAppointments, doctors, backendUrl } = useContext(AdminContext);

  const totalAppointments = allAppointments?.length || 0;
  const totalDoctors = doctors?.length || 0;
  const totalPatients = new Set(allAppointments?.map(a => a?.userData?._id)).size || 0;

  const lists = [
    { icon: <FaUserDoctor size={40} />, count: totalDoctors, label: "Doctor" },
    { icon: <MdContentPasteSearch size={40} />, count: totalAppointments, label: "Appointment" },
    { icon: <IoIosPeople size={40} />, count: totalPatients, label: "Patient" },
  ];

  const getAgeFromDOB = (dobStr) => {
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
                {allAppointments && allAppointments.length > 0 ? (
                  [...allAppointments]
                    .reverse()
                    .slice(0, 5)
                    .map((item, index) => (
                      <TableRow key={item?._id || index}>
                        <TableCell>{index + 1}</TableCell>
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
                        <TableCell>
                          {item?.userData?.dob ? getAgeFromDOB(item.userData.dob) : "N/A"}
                        </TableCell>
                        <TableCell>{item?.slotDate}, {item?.slotTime}</TableCell>
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
                        <TableCell>{item?.docData?.fees ?? "N/A"}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-4">
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

export default AdminDashboard;
