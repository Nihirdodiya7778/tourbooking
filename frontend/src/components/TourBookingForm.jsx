import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TourBookingForm = ({ bookings, setBookings, editingBooking, setEditingBooking }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tourName: '',
    destination: '',
    startDate: '',
    endDate: '',
    numberOfPeople: '',
  });

  useEffect(() => {
    if (editingBooking) {
      setFormData({
        tourName: editingBooking.tourName,
        destination: editingBooking.destination,
        startDate: editingBooking.startDate,
        endDate: editingBooking.endDate,
        numberOfPeople: editingBooking.numberOfPeople,
      });
    } else {
      setFormData({
        tourName: '',
        destination: '',
        startDate: '',
        endDate: '',
        numberOfPeople: '',
      });
    }
  }, [editingBooking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBooking) {
        const response = await axiosInstance.put(`/api/bookings/${editingBooking._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBookings(bookings.map((booking) => (booking._id === response.data._id ? response.data : booking)));
      } else {
        const response = await axiosInstance.post('/api/bookings', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBookings([...bookings, response.data]);
      }
      setEditingBooking(null);
      setFormData({
        tourName: '',
        destination: '',
        startDate: '',
        endDate: '',
        numberOfPeople: '',
      });
    } catch (error) {
      alert('Failed to save booking.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingBooking ? 'Edit Tour Booking' : 'Create Tour Booking'}
      </h1>

      <input
        type="text"
        placeholder="Tour Name"
        value={formData.tourName}
        onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Destination"
        value={formData.destination}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="date"
        value={formData.startDate}
        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="date"
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Number of People"
        value={formData.numberOfPeople}
        onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingBooking ? 'Update Booking' : 'Create Booking'}
      </button>
    </form>
  );
};

export default TourBookingForm;
