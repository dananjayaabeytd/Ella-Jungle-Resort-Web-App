const router = require("express").Router();
const Reservation = require("../models/ActivityReservation");
const SpaReservation = require("../models/appointment");

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




module.exports = router;