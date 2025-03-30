const express = require('express');
const router = express.Router();
const { addTourBooking, getTourBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');

// Routes for Tour Bookings
router.post('/', addTourBooking);  // Add new booking
router.get('/', getTourBookings);  // Get all bookings for a user
router.put('/:id', updateBooking); // Update a specific booking
router.delete('/:id', deleteBooking); // Delete a specific booking

module.exports = router;
