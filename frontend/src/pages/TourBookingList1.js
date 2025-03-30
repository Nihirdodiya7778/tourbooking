import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import axiosInstance from '../axiosConfig';
import TourBookingForm from '../components/TourBookingForm'; // Assuming the form component is in 'components'
import TourBookingList from '../components/TourBookingList'; // Assuming the list component is in 'components'
//import React, { useState } from 'react';  // Add this import statement at the top


const TourBookingListPage = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const navigate = useNavigate(); // Use hook to navigate back to dashboard

  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    
    fetchBookings();
  }, []);

  // Handle navigating back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/tour-booking-dashboard'); // Navigate to the dashboard page
  };

  return (
    <div>
      <h1>Tour Booking List</h1>
      <button onClick={handleBackToDashboard} className="bg-gray-500 text-white p-2 rounded">
        Back to Dashboard
      </button>
      <TourBookingForm
        bookings={bookings}
        setBookings={setBookings}
        editingBooking={editingBooking}
        setEditingBooking={setEditingBooking}
      />
      <TourBookingList
        bookings={bookings}
        setBookings={setBookings}
        setEditingBooking={setEditingBooking}
      />
    </div>
  );
};

export default TourBookingListPage;
