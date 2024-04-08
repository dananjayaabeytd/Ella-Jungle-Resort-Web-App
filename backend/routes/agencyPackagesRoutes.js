const Router = require("express").Router();
const multer = require("multer");

let AgencyPackages = require("../models/agencyPackageModel");

storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/assets/agencyPackageImages/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single("packageImage");

// Add new agency package

Router.route("/addAgencyPackage").post((req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(400).send("Error uploading file");
    }

    const packageName = req.body.packageName;
    const packageImage = req.file ? req.file.filename : null; // Check if file exists
    const roomId = req.body.roomId;
    const activityId = req.body.activityId || null;
    const transportId = req.body.transportId || null;
    const fullDays = Number(req.body.fullDays);
    const packageDescription = req.body.packageDescription || null;
    const commission = Number(req.body.commission || 0);
    const discount = Number(req.body.discount || 0);
    const price = Number(req.body.price);
    const agencyId = req.body.agencyId;
    const published = req.body.published;

    const newAgencyPackage = new AgencyPackages({
      packageName,
      packageImage,
      roomId,
      activityId,
      transportId,
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
        res.status(500).send("Error saving package to database");
      });
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
Router.route("/getAgencyPackageByAgencyId/:agencyId").get((req, res) => {
  AgencyPackages.find({ agencyId: req.params.agencyId })
    .then((agencyPackages) => {
      res.json(agencyPackages);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch agency packages" });
    });
});

// update agency package
Router.route("/updateAgencyPackage/:packageId").put(async (req, res) => {
  const packageId = req.params.packageId;

  const {
    packageName,
    packageImage,
    roomId,
    activityId,
    transportId,
    fullDays,
    packageDescription,
    commission,
    discount,
    price,
    agencyId,
    published,
  } = req.body;

  const updatedPackage = {
    packageName,
    packageImage,
    roomId,
    activityId,
    transportId,
    fullDays,
    packageDescription,
    commission,
    discount,
    price,
    agencyId,
    published,
  };

  try {
    const updatePackage = await AgencyPackages.findByIdAndUpdate(
      packageId,
      updatedPackage
    );

    if (updatePackage) {
      res.status(200).json({ message: "Package updated successfully" });
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete agency package by ID
Router.route("/deleteAgencyPackage/:id").delete((req, res) => {
  AgencyPackages.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Package deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete package" });
    });
});

module.exports = Router;
