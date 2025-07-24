import { createContext, useState, useEffect } from "react";
export const AdminContext = createContext();
import axios from "axios";

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [allAppointments, setAllAppointments] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllAppointments = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/admin/all-appointments`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${aToken}`,
                }
            });
            if (response.data.success) {
                setAllAppointments(response.data.allAppointments);
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    const retrieveAllDoctorData = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/admin/doctor-list`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${aToken}`,
            },
          });
          console.log("response", response);
    
          if (response.data.success) {
            setDoctors(response.data.doctors)
          }
    
        } catch (error) {
          console.log("Error", error);
        }
      }

    useEffect(() => {
      if(aToken){
        getAllAppointments();
        retrieveAllDoctorData();
      }
    }, [])

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors, setDoctors, 
        allAppointments, setAllAppointments
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
