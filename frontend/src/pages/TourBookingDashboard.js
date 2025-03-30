import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axiosInstance from '../axiosConfig';

const TourBookingDashboard = () => {
  const [bookings, setBookings] = useState([]); // Initialize bookings as an empty array
  const [editingBooking, setEditingBooking] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Fetch bookings from localStorage or API when the component mounts
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings)); // Parse and set from localStorage
    } else {
      // Fetch from the API
      const fetchBookings = async () => {
        try {
          const response = await axiosInstance.get('/api/bookings');
          // Ensure the response data is an array
          if (Array.isArray(response.data)) {
            setBookings(response.data);
            localStorage.setItem('bookings', JSON.stringify(response.data)); // Save to localStorage
          } else {
            console.error('API response is not an array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
      fetchBookings();
    }
  }, []); // Empty dependency array ensures this runs on mount only

  // Handle delete functionality
  const handleDelete = async (bookingId) => {
    try {
      await axiosInstance.delete(`/api/bookings/${bookingId}`);
      const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings)); // Update localStorage
    } catch (error) {
      alert('Failed to delete booking.');
    }
  };

  // Navigate to the TourBookingList page
  const handleNavigateToListPage = () => {
    navigate('/tour-booking-list'); // Navigate to the List page
  };

  return (
    <div>
      <h1>Tour Booking Dashboard</h1>
      <button onClick={handleNavigateToListPage} className="bg-blue-500 text-white p-2 rounded">
        Go to Tour Booking List
      </button>
      {/* Only render if bookings is a valid array */}
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id}>
            <h2>{booking.tourName}</h2>
            <p>{booking.destination}</p>
            <p>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Number of People: {booking.numberOfPeople}</p>
            <button onClick={() => setEditingBooking(booking)}>Edit</button>
            <button onClick={() => handleDelete(booking._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
};

export default TourBookingDashboard;
