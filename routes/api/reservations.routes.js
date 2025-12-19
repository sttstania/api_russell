const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getReservations,
  getReservation,
  createReservation,
  deleteReservation
} = require("../../controllers/reservationController");
// const authMiddleware = require("../../middlewares/auth.middleware");

// router.use(authMiddleware);

router.get("/:id/reservations", getReservations);
router.get("/:id/reservations/:reservationId", getReservation);
router.post("/:id/reservations", createReservation);
router.delete("/:id/reservations/:reservationId", deleteReservation);

module.exports = router;
