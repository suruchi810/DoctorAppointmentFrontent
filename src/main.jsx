import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PatientContextProvider from './context/PatientContext'
import DoctorContextProvider from './context/doctorContext'
import AdminContextProvider from './context/AdminContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <PatientContextProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </PatientContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter >,
)
