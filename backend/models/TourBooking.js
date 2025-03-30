const mongoose = require('mongoose');

const tourBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tourName: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true },
});

module.exports = mongoose.model('TourBooking', tourBookingSchema);
