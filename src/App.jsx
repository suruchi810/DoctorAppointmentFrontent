import './App.css'
import AdminNavbar from './components/Admin/AdminNavbar';
import DoctorNavbar from './components/Doctor/DoctorNavbar';
import AddDoctors from './pages/admin/AddDoctors';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllAppointments from './pages/admin/AllAppointments';
import DoctorsList from './pages/admin/DoctorsList';
import DoctorAllAppointments from './pages/Doctor/DoctorAllAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import Appointment from './pages/Patient/Appointment';
import MyAppointments from './pages/Patient/MyAppointments';
import MyProfile from './pages/Patient/MyProfile';
import About from './pages/Patient/About';
import Login from './pages/Patient/PatientLogin';
import Doctors from './pages/Patient/Doctors';
import Home from './pages/Patient/Home';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from './context/AdminContext';
import { PatientContext } from './context/PatientContext';
import Sidebar from './components/Sidebar';
import LoginForm from './pages/LoginForm';
import PatientSignup from './pages/Patient/PatientSignup';
import DoctorSignup from './pages/Doctor/DoctorSignup';
import { Route, Routes } from 'react-router-dom'
import PatientNavbar from './components/Patient/PatientNavbar';
import Contact from './pages/Patient/Contact';
import Footer from './components/Patient/Footer';
import { DoctorContext } from './context/DoctorContext';

function App() {

  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);
  const {token} = useContext(PatientContext);
  const [active, setActive] = useState("dashboard")

  useEffect(() => {
  }, [active])

  return (
    <>
      {aToken && (
        <div className='h-[100vh] w-[100vw] flex flex-col'>
          <AdminNavbar />
          <div className='flex bg-gray-50 flex-1 w-full'>
            <Sidebar active={active} setActive={setActive} />
            {active === "dashboard" && <AdminDashboard />}
            {active === "appointments" && <AllAppointments />}
            {active === "addDoctor" && <AddDoctors />}
            {active === "doctorList" && <DoctorsList />}
          </div>
        </div>
      )}

      {dToken && (
        <div className='h-[100vh] w-[100vw] flex flex-col'>
          <DoctorNavbar />
          <div className='flex bg-gray-50 flex-1 w-full'>
            <Sidebar active={active} setActive={setActive} />
            {active === "dashboard" && <DoctorDashboard />}
            {active === "doctor-all-appointments" && <DoctorAllAppointments />}
          </div>
        </div>
      )}

      {token && (<div className="mx-4 sm:mx-[10%]">
        <PatientNavbar/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/doctors' element={<Doctors />}></Route>
          <Route path='/doctors/:speciality' element={<Doctors />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/my-profile' element={<MyProfile />}></Route>
          <Route path='/my-appointments' element={<MyAppointments />}></Route>
          <Route path='/appointment/:docId' element={<Appointment />}></Route>
        </Routes>
        <Footer/>
      </div>
      )}

      {!aToken && !dToken && !token &&
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/patient-signup' element={<PatientSignup />}></Route>
          <Route path='/doctor-sigup' element={<DoctorSignup />}></Route>
        </Routes>
      }
    </>
  )
}

export default App
