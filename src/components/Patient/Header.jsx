import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'

const Header = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#5F6FFF] mt-4 rounded-lg px-4 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col justify-center px-2 sm:px-6 space-y-6">
                <p className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-white leading-snug">
                    Book Appointment<br />With Trusted Doctors
                </p>

                <div className="flex items-start sm:items-center gap-4">
                    <img src={assets.group_profiles} alt="Group Profiles" className="w-12 sm:w-16 h-auto object-cover" />
                    <p className="text-sm sm:text-base text-white">
                        Simply browse through our extensive list of trusted doctors,<br />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                <a
                    href="#speciality"
                    className="inline-flex w-fit items-center gap-2 hover:underline text-sm sm:text-lg bg-white rounded-3xl px-4 py-2"
                >
                    <button className="">Book appointment</button>
                    <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
                </a>
            </div>

            <div className="mt-8 lg:mt-0 flex justify-center items-center">
                <img src={assets.header_img} alt="Header Visual" className="w-full max-w-md sm:max-w-lg lg:max-w-full" />
            </div>
        </div>
    )
}

export default Header
