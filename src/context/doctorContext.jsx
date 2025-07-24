import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [allAppointment, setAllAppointment] = useState(null);
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');

    const allAppointments = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/doctor/all-appointments`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${dToken}`,
                },
            });
            if(res.data.success){
                setAllAppointment(res.data.allAppointments);
            }
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        if(dToken){
            allAppointments();
        }
    }, [])

    const value = {
        dToken, setDToken, backendUrl, allAppointment, setAllAppointment, allAppointments
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;