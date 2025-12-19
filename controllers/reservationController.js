const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
};

exports.getReservation = async (req, res) => {
  const reservation = await Reservation.findById(req.params.reservationId);
  if (!reservation) return res.status(404).json({ message: "Reservation not found" });
  res.json(reservation);
};

exports.createReservation = async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway not found" });
  const reservation = await Reservation.create({ ...req.body, catwayNumber: catway.catwayNumber });
  res.status(201).json(reservation);
};

exports.deleteReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.reservationId);
  if (!reservation) return res.status(404).json({ message: "Reservation not found" });
  res.json({ message: "Reservation deleted" });
};
