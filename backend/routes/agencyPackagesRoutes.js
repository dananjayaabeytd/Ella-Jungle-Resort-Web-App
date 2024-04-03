const Router = require("express").Router();

let AgencyPackages = require("../models/agencyPackageModel");

// Add new agency package

Router.route("/addAgencyPackage").post((req, res) => {
  const packageName = req.body.packageName;
  const packageImage = req.body.packageImage;
  const roomId = req.body.roomId;
  const activityId = req.body.activityId;
  const transportId = req.body.transportId;
  const spaId = req.body.spaId;
  const fullDays = Number(req.body.fullDays);
  const packageDescription = req.body.packageDescription;
  const commission = Number(req.body.commission);
  const discount = Number(req.body.discount);
  const price = Number(req.body.price);
  const agencyId = req.body.agencyId;
  const published = req.body.published;

  const newAgencyPackage = new AgencyPackages({
    packageName,
    packageImage,
    roomId,
    activityId,
    transportId,
    spaId,
    fullDays,
    packageDescription,
    commission,
    discount,
    price,
    agencyId,
    published,
  });

  newAgencyPackage
    .save()
    .then(() => {
      res.json("New package added!");
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all agency packages from the database

Router.route("/getAllAgencyPackage").get((req, res) => {
  AgencyPackages.find()
    .then((agencyPackages) => {
      res.json({ agencyPackages });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get agency package by id

Router.route("/getAgencyPackageById/:id").get((req, res) => {
  AgencyPackages.findById(req.params.id)
    .then((agencyPackage) => {
      res.json(agencyPackage);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get agency package by agency id

Router.route("/getAgencyPackageByAgencyId/:id").get((req, res) => {
  AgencyPackages.find({ agencyId: req.params.id })
    .then((agencyPackages) => {
      res.json(agencyPackages);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update agency package

Router.route("/updateAgencyPackage/:id").put((req, res) => {
  AgencyPackages.findById(req.params.id)
    .then((agencyPackage) => {
      agencyPackage.packageName = req.body.packageName;
      agencyPackage.packageImage = req.body.packageImage;
      agencyPackage.roomId = req.body.roomId;
      agencyPackage.activityId = req.body.activityId;
      agencyPackage.transportId = req.body.transportId;
      agencyPackage.spaId = req.body.spaId;
      agencyPackage.fullDays = Number(req.body.fullDays);
      agencyPackage.packageDescription = req.body.packageDescription;
      agencyPackage.commission = Number(req.body.commission);
      agencyPackage.discount = Number(req.body.discount);
      agencyPackage.price = Number(req.body.price);
      agencyPackage.agencyId = req.body.agencyId;
      agencyPackage.published = req.body.published;

      agencyPackage
        .save()
        .then(() => {
          res.json("Package updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete agency package

Router.route("/deleteAgencyPackage/:id").delete((req, res) => {
  AgencyPackages.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Package deleted!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = Router;
