import React from 'react';
import { assets } from '../../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#5F6FFF]">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-10">
        {/* Right side (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={assets?.appointment_img}
            alt="Appointment Illustration"
            className="w-[280px] sm:w-[400px] md:w-[480px] lg:w-[560px] h-auto"
          />
        </div>

        {/* Left side (Text & Button) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left gap-6">
          <p className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Book Appointment <br />
            With 100+ Trusted Doctors
          </p>
          <button
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
            className="bg-white text-[#4B5563] rounded-2xl px-6 py-3 text-base font-medium shadow-md hover:bg-gray-100 transition"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
