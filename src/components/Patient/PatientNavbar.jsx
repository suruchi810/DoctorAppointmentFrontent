import React, {useEffect, useContext, useState } from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { TbMenuDeep } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { PatientContext } from '@/context/PatientContext';

const PatientNavbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const { userData, backendUrl } = useContext(PatientContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken("");
    navigate('/');
  }

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  return (
    <div className={`flex justify-between items-center w-full border-b border-b-gray-200 h-[75px] sticky top-0 ${
        isScrolled ? 'bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]' : ''
      }`}>
      <img
        onClick={() => navigate('/a')}
        src={assets.logo}
        alt="logo"
        className="lg:w-[160px] sm:w-[120px] "
      />
      <div className='hidden md:flex w-1/3 justify-between'>
        <NavLink to='/' className={({ isActive }) =>
          `font-bold whitespace-nowrap text-nowrap tracking-wide relative after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-10px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''}`
        }>Home</NavLink>
        <NavLink to='/doctors' className={({ isActive }) =>
          `font-bold whitespace-nowrap text-nowrap tracking-wide relative after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-10px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''}`
        }>All doctors</NavLink>
        <NavLink to='/about' className={({ isActive }) =>
          `font-bold whitespace-nowrap text-nowrap tracking-wide relative after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-10px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''}`
        }>About</NavLink>
        <NavLink to='/contact' className={({ isActive }) =>
          `font-bold whitespace-nowrap text-nowrap tracking-wide relative after:content-[""] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-[-10px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''}`
        }>Contact</NavLink>
      </div>
      <div className='flex gap-1'>
        {token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
          <img src={`${backendUrl}/images/${userData?.image}`} className='h-10 w-10 rounded-2xl' alt="" />
          <div className='absolute top-0 pt-14 right-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='min-w-43 bg-stone-100 rounded flex flex-col gap-4 p-4'>
              <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
              <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
          <img src={assets.dropdown_icon} className='w-2.5' alt="" />
        </div> : <button onClick={() => navigate('/login')} className='bg-[#5F6FFF] rounded-3xl px-3 py-2'>Create Account</button>}

        <div className="md:hidden relative z-30 opacity-70">
          <div className="p-2">
            {showMenu ? (
              <RxCross2 onClick={() => setShowMenu(false)} size={35} className="text-black" />
            ) : (
              <TbMenuDeep onClick={() => setShowMenu(true)} size={35} className="text-black" />
            )}
          </div>

          {showMenu && (
            <div
              className={`fixed top-0 right-0 w-full bg-black text-white z-40 transition-transform duration-300 ease-in-out flex flex-col gap-6 p-6 shadow-lg`}>
              <div className="flex justify-end">
                <RxCross2 onClick={() => setShowMenu(false)} size={28} className="cursor-pointer" />
              </div>

              <ul className="flex flex-col gap-4 text-lg">
                <NavLink
                  to="/"
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `font-semibold relative after:content-[""] after:absolute after:left-1/11 after:translate-x-[-50%] after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/doctors"
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `font-semibold relative after:content-[""] after:absolute after:left-1/11 after:translate-x-[-50%] after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''
                    }`
                  }
                >
                  All Doctors
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `font-semibold relative after:content-[""] after:absolute after:left-1/11 after:translate-x-[-50%] after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `font-semibold relative after:content-[""] after:absolute after:left-1/11 after:translate-x-[-50%] after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#4FA3FC] hover:after:w-10 after:transition-all after:duration-300 ${isActive ? 'after:w-10' : ''
                    }`
                  }
                >
                  Contact
                </NavLink>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default PatientNavbar
