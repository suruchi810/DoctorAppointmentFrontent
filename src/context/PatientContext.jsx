import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchDoctorsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/doctor-list`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.success) {
                setDoctors(response.data.doctorList)
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    const getUserProfileData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/user-profile`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.success) {
                setUserData(response.data.userData)
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchDoctorsData();
            getUserProfileData();
        }
    }, [])

    const value = {
        doctors,
        backendUrl,
        token, setToken,
        userData, setUserData,
        getUserProfileData
    }

    return (
        <PatientContext.Provider value={value}>
            {props.children}
        </PatientContext.Provider>
    )
}

export default PatientContextProvider