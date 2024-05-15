import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";

import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoutes";
import CreateTime from "../pages/DoctorDashboard/CreateTime";
import BookedTimes from "../pages/DoctorDashboard/BookedTimes";
import AvailableTimes from "../pages/DoctorDashboard/AvailableTimes";
import AllTimes from "../pages/DoctorDashboard/AllTimes";
import Reviews from "../pages/DoctorDashboard/Reviews";
import Appointments from "../pages/UserDashboard/Appointments";
import CreateAppointment from "../pages/UserDashboard/CreateAppointment";
import Profile from "../pages/DoctorDashboard/Profile";
import DoctorDashboard from "../pages/DoctorDashboard/DoctorDashboard";

const Routers = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />

      {/* doctor dashboard */}
      <Route path="/time/create" element={<ProtectedRoute role="doctor"><CreateTime /></ProtectedRoute>} />
      <Route path="/time/booked" element={<ProtectedRoute role="doctor"><BookedTimes /></ProtectedRoute>} />
      <Route path="/time/available" element={<ProtectedRoute role="doctor"><AvailableTimes /></ProtectedRoute>} />
      <Route path="/time/all" element={<ProtectedRoute role="doctor"><AllTimes /></ProtectedRoute>} />
      <Route path="/review/all" element={<ProtectedRoute role="doctor"><Reviews /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute role="doctor"><Profile /></ProtectedRoute>} />
      <Route path="/doctor/dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />

      {/* user dashboard */}
      <Route path="/appointments" element={<ProtectedRoute role="regular"><Appointments /></ProtectedRoute>} />
      <Route path="/appointment/create" element={<ProtectedRoute role="regular"><CreateAppointment /></ProtectedRoute>} />
    </Routes>
  )
}

export default Routers;