import React from 'react'
import { specialityData } from '@/assets/assets_frontend/assets';
import { Link, useNavigate } from 'react-router-dom'

const SpecialityMenu = () => {
    const navigate = useNavigate();

    return (
        <section
            id="speciality"
            className="flex flex-col items-center text-center px-4 py-16 lg:py-24"
        >

            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900">
                Find by Speciality
            </h2>

            <p className="mt-4 max-w-xl text-base md:text-lg text-gray-600">
                Simply browse through our extensive list of trusted doctors and schedule
                your appointment hassle‑free.
            </p>

            <div className="mt-10 w-full overflow-x-auto hide-scrollbar">
                <div className="flex gap-4 w-max px-2 m-auto">
                    {specialityData.map(({ speciality, image }, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => {
                                navigate(`/doctors/${speciality}`);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img
                                src={image}
                                alt={speciality}
                                className="w-20 h-20 object-contain mb-2 shadow-sm rounded-full transition duration-300
          hover:shadow-md hover:-translate-y-2 border-white"
                                loading="lazy"
                            />
                            <span className="text-gray-800 font-medium text-sm text-center group-hover:text-blue-600">
                                {speciality}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default SpecialityMenu