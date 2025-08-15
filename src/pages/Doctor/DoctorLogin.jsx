import { AdminContext } from '@/context/AdminContext';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DoctorContext } from '@/context/DoctorContext';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const { setDToken, backendUrl } = useContext(DoctorContext);
    const [errorMessage, setErrorMessage] = useState("");

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        try {
            const res = await axios.post(`${backendUrl}/api/doctor/doctor-login`, { email, password });
            if (res.data.success) {
                setDToken(res.data.dToken);
                localStorage.setItem('dToken', res.data.dToken);
                navigate('/')
            } else {
                // If backend sends success: false with a message
                setErrorMessage(res.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
    };

    return (
    <form className='flex flex-col gap-3' onSubmit={onSubmitHandler}>
        {errorMessage && (
            <div className="text-red-500 text-sm border border-red-400 p-2 rounded">
                {errorMessage}
            </div>
        )}
        <div className='flex flex-col gap-2'>
            <label>Email</label>
            <input
                type="text"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className='w-full py-2 px-4 bg-gray-50 border border-gray-300'
            />
        </div>
        <div className='flex flex-col gap-2'>
            <label>Password</label>
            <input
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                className='w-full py-2 px-4 bg-gray-50 border border-gray-300'
            />
        </div>
        <button
            type="submit"
            className='bg-blue-500 rounded-[5px] py-2 text-white'
        >
            Login
        </button>
    </form>
);

};

export default DoctorLogin;
