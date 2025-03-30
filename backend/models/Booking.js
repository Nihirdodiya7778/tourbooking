const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true },
  status: { type: String, default: 'Pending' }  // Example: "Confirmed", "Pending", "Cancelled"
});

module.exports = mongoose.model('Booking', bookingSchema);
