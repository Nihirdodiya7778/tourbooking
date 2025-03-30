const TourBooking = require('../models/TourBooking');
const Booking = require('../models/Booking');

// Add Tour Booking
const addTourBooking = async (req, res) => {
  const { tourName, destination, startDate, endDate, numberOfPeople } = req.body;
  try {
    const booking = await TourBooking.create({ 
      userId: req.user.id, 
      tourName, 
      destination, 
      startDate, 
      endDate, 
      numberOfPeople
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tour Bookings
const getTourBookings = async (req, res) => {
  try {
    const bookings = await TourBooking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Tour Booking
const updateBooking = async (req, res) => {
  const { destination, date, numberOfPeople, status } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update only if new values are provided
    booking.destination = destination || booking.destination;
    booking.date = date || booking.date;
    booking.numberOfPeople = numberOfPeople ?? booking.numberOfPeople;
    booking.status = status || booking.status; // Example: "Confirmed", "Pending", "Cancelled"

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "An error occurred while updating the booking. Please try again." });
  }
};

// Delete Tour Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne(); // Use `deleteOne()` instead of `remove()` (deprecated)
    res.json({ message: 'Booking deleted successfully' });

  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "An error occurred while deleting the booking. Please try again." });
  }
};

// Export the functions
module.exports = { addTourBooking, getTourBookings, updateBooking, deleteBooking };



