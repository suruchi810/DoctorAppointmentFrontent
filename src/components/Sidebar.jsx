import React, { useContext } from 'react'
import { MdDashboard, MdPeopleAlt } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { HiClipboardList } from "react-icons/hi";
import { AdminContext } from '@/context/AdminContext';
import { DoctorContext } from '@/context/DoctorContext';

const Sidebar = ({ active, setActive }) => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <div className="h-full w-64 bg-white shadow-md py-4">
            {aToken && [
                { icon: <MdDashboard />, label: "Dashboard", value: "dashboard" },
                { icon: <HiClipboardList />, label: "All Appointments", value: "appointments" },
                { icon: <IoIosAddCircle />, label: "Add Doctor", value: "addDoctor" },
                { icon: <MdPeopleAlt />, label: "Doctor Lists", value: "doctorList" },
            ].map((item) => (
                <div
                    key={item.value}
                    onClick={() => setActive(item.value)}
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${active === item.value ? "bg-gray-100 border-r-4 border-r-blue-600" : "text-gray-700"
                        }`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                </div>
            ))}

            {dToken && [
                { icon: <MdDashboard />, label: "Dashboard", value: "dashboard" },
                { icon: <HiClipboardList />, label: "All Appointments", value: "doctor-all-appointments" },
            ].map((item) => (
                <div
                    key={item.value}
                    onClick={() => setActive(item.value)}
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${active === item.value ? "bg-gray-100 border-r-4 border-r-blue-600" : "text-gray-700"
                        }`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                </div>
            ))}
        </div>

    )
}

export default Sidebar