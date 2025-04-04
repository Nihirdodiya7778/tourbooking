import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TourBookingDashboard from './pages/TourBookingDashboard'; // Use this component
import TourBookingList1 from './pages/TourBookingList1';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tour-bookings" element={<TourBookingDashboard />} /> {/* Directly use the TourBookingDashboard */}
        <Route path="/tour-booking-list" element={<TourBookingList1 />} />
      </Routes>
    </Router>
   
  );
}

export default App;
