const router = require("express").Router();
const Reservation = require("../models/ActivityReservation");
const SpaReservation = require("../models/appointment");
const hotelPackageBooking = require("../models/Hotel_Package_booking");

// Route to fetch all Special Activity reservations
router.route("/allSpecialActivityReservations").get((req, res) => {
  Reservation.find()
    .then((reservations) => {
      res.json(reservations);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching reservations" });
    });
});

//route to fetch all spa appointments
router.route("/allSpaAppointments").get((req, res) => {
    SpaReservation.find()
      .then((appointment) => {
        res.json(appointment);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching appointments" });
      });
  });

  //route to fetch all hotel package booking
router.route("/allHotelPackageBooking").get((req, res) => {
    hotelPackageBooking.find()
      .then((booking) => {
        res.json(booking);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching bookings" });
      });
  });


module.exports = router;