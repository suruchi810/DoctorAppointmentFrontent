import { PatientContext } from '@/context/PatientContext';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const PatientSignup = () => {
    
    const navigate = useNavigate();
    const {backendUrl, token, setToken} = useContext(PatientContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = userData;
        try {
            const response = await axios.post(`${backendUrl}/api/user/user-register`, {name, email, password});
            console.log("response", response);
            if(response.data.success){
                setToken(response.data.token);
                console.log("response.data.token", response.data.token);
                console.log("token", token);
                localStorage.setItem("token", response.data.token)
                navigate('/');
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(()=>{
    }, [token])

    return (
        <div className='flex justify-center items-center h-screen w-full bg-[#151e2e] '>
            <div className='w-1/3 flex flex-col m-auto bg-white shadow-lg p-10 gap-5'>
                <div className='flex flex-col'>
                    <h1 className='text-[26px] font-bold text-[#4B5563]'>Signup Here</h1>
                    <p className='text-[#4B5563]'>Please signup to book appointment</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" value={userData.name} name="name" onChange={(e) => setUserData({ ...userData, name: e.target.value})} className='w-full py-2 px-4 bg-gray-50 border border-gray-300' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" value={userData.email} name="email" onChange={(e) => setUserData({ ...userData, email: e.target.value})} className='w-full py-2 px-4 bg-gray-50 border border-gray-300' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Password</label>
                        <input type="password" value={userData.password} name="password" onChange={(e) => setUserData({ ...userData, password: e.target.value})} className='w-full py-2 px-4 bg-gray-50 border border-gray-300' />
                    </div>
                    <button onClick={handleSignup} className='bg-blue-500 rounded-[5px] py-2'>Signup</button>
                </div>
                <p>Already have an account?<span onClick={()=>navigate('/')} className='text-blue-700 cursor-pointer'>Login here</span></p>
            </div>
        </div>
    )
}

export default PatientSignup