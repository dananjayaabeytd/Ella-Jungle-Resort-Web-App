const Router = require("express").Router();

let AgencyPackageReservation = require("../models/agencyPackageReservationModel");

// Get all agency package reservations
Router.route("/getAllAgencyPackageReservations").get((req, res) => {
  AgencyPackageReservation.find()
    .then((agencyPackageReservations) => res.json(agencyPackageReservations))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add new agency package reservation
Router.route("/addAgencyPackageReservation").post((req, res) => {
  const packageId = req.body.packageId;
  const userId = req.body.userId;
  const fullName = req.body.fullName;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const reservationDate = Date.parse(req.body.reservationDate);
  const checkIn = Date.parse(req.body.checkIn);
  const checkOut = Date.parse(req.body.checkOut);
  const noOfAdults = Number(req.body.noOfAdults);
  const noOfChildren = Number(req.body.noOfChildren);
  const totalAmount = Number(req.body.totalAmount);
  const paymentStatus = req.body.paymentStatus;

  const newAgencyPackageReservation = new AgencyPackageReservation({
    packageId,
    userId,
    fullName,
    email,
    contactNumber,
    reservationDate,
    checkIn,
    checkOut,
    noOfAdults,
    noOfChildren,
    totalAmount,
    paymentStatus,
  });

  newAgencyPackageReservation
    .save()
    .then(() => res.json("New package reservation added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get agency package reservation by ID
Router.route("/getAgencyPackageReservationById/:reservationId").get(
  (req, res) => {
    AgencyPackageReservation.findById(req.params.id)
      .then((agencyPackageReservation) => res.json(agencyPackageReservation))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// Update agency package reservation by ID
Router.route("/updateAgencyPackageReservation/:reservationId").post((req, res) => {
    AgencyPackageReservation.findById(req.params.id)
      .then((agencyPackageReservation) => {
        agencyPackageReservation.packageId = req.body.packageId;
        agencyPackageReservation.userId = req.body.userId;
        agencyPackageReservation.fullName = req.body.fullName;
        agencyPackageReservation.email = req.body.email;
        agencyPackageReservation.contactNumber = req.body.contactNumber;
        agencyPackageReservation.reservationDate = Date.parse(req.body.reservationDate);
        agencyPackageReservation.checkIn = Date.parse(req.body.checkIn);
        agencyPackageReservation.checkOut = Date.parse(req.body.checkOut);
        agencyPackageReservation.noOfAdults = Number(req.body.noOfAdults);
        agencyPackageReservation.noOfChildren = Number(req.body.noOfChildren);
        agencyPackageReservation.totalAmount = Number(req.body.totalAmount);
        agencyPackageReservation.paymentStatus = req.body.paymentStatus;

        agencyPackageReservation.save()
          .then(() => res.json("Package reservation updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// Delete agency package reservation by ID

Router.route("/deleteAgencyPackageReservation/:reservationId").delete(
  (req, res) => {
    AgencyPackageReservation.findByIdAndDelete(req.params.id)
      .then(() => res.json("Package reservation deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

module.exports = Router;
