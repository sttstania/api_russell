const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Catway number is required']
  },
  clientName: {
    type: String,
    required: [true, 'Cient name is required']
  },
  boatName: {
    type: String,
    required: [true, 'Boat name is required']
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  }, 
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
