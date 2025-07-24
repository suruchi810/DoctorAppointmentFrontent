import React, { useState } from "react";
import { assets } from '../assets/assets_admin/assets'
import PatientLogin from "./Patient/PatientLogin";
import AdminLogin from "./admin/Adminlogin";
import DoctorLogin from "./Doctor/DoctorLogin";

const userTypes = [
    {
        label: "Patient",
        img: assets.patients_icon,
    },
    {
        label: "Doctor",
        img: assets.doctor_icon,
    },
    {
        label: "Admin",
        img: assets.doctor_icon,
    },
];

const LoginForm = () => {
    const [selected, setSelected] = useState(0);
    const [type, setType] = useState("Patient");

    return (
        <div className="h-screen  w-full flex  flex-col justify-between bg-[#151e2e] ">
            <div className=" flex flex-col h-full justify-center items-center relative">

                <div className="relative font-inter drop-shadow-one z-10 flex h-full  gap-10  flex-col items-center justify-center w-full">
                    <div className="">
                        <img className="w-[200px]" src={assets.logo} alt="" />
                    </div>

                    <div className="rounded-[40px] zoomprop bg-white px-16 w-1/3 h-fit py-12 ">
                        <div className="w-full h-full text-black flex flex-col items-center justify-center gap-[20px]">
                            <h1 className="font-ibm font-bold text-3xl text-dark-blue">
                                Login
                            </h1>
                            <div className="center flex flex-col w-full gap-[30px]">
                                <div className="flex flex-col gap-2 w-full">
                                    <h1 className="font-inter font-medium text-[14px] text-dark-blue">
                                        Choose User Type
                                    </h1>
                                    <div className="h-[125px] w-full  flex items-center justify-center">
                                        {userTypes.map((type, idx) => (
                                            <div
                                                key={type.label}
                                                onClick={() => { setSelected(idx), setType(type.label) }}
                                                className={`flex flex-col items-center justify-center cursor-pointer h-full w-full border border-[#CBD6E2] transition-all  duration-200
                            ${selected === idx ? "bg-[#4ea1ff]" : "bg-white"}
                            ${idx === 0 ? "rounded-l-[20px]" : ""}
                            ${idx === userTypes.length - 1
                                                        ? "rounded-r-[20px]"
                                                        : ""
                                                    }
                            ${idx < userTypes.length - 1 &&
                                                        !(selected === idx + 1)
                                                        ? "border-r border-[#e3eaf3]"
                                                        : ""
                                                    }
                            relative
                          `}
                                            >
                                                <img
                                                    src={type.img}
                                                    alt={type.label}
                                                    className={`h-[60px] mb-2 ${selected === idx ? "" : "opacity-40 grayscale"
                                                        }`}
                                                />
                                                <span
                                                    className={`text-base font-medium text-[14px] ${selected === idx ? "text-white" : "text-[#22314f]"
                                                        }`}
                                                >
                                                    {type.label}
                                                </span>
                                                {/* OR pill */}
                                                {idx < userTypes.length - 1 && (
                                                    <div className="absolute right-[-22px] top-1/2 -translate-y-1/2 z-10">
                                                        <div className="bg-white border border-[#e3eaf3] rounded-md px-3 py-1 shadow-sm text-xs font-semibold text-[#999999]">
                                                            OR
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {type === "Patient" && <PatientLogin/>}
                                {type === "Doctor" && <DoctorLogin/>}
                                {type === "Admin" && <AdminLogin/>}

                            </div>


                        </div>
                    </div>

                    <div className="text-white font-inter font-medium text-[14px] ">
                        Copyright © 2025 Perscripto - All Right Reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
