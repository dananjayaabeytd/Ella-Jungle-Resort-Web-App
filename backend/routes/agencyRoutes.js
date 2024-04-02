const router = require("express").Router();
const Agency = require("../models/agencyModel");

// Insert new agency
router.post("/add", async (req, res) => {
  try {
    const {
      agencyName,
      address,
      img,
      mobile,
      businessRegistrationNumber,
      representerMail,
      businessMail,
      fax,
      taxIdNumber,
      description,
      websiteLink,
      rating,
      agentId,
    } = req.body;

    const newAgency = new Agency({
      agencyName,
      address,
      img,
      mobile,
      businessRegistrationNumber,
      representerMail,
      businessMail,
      fax,
      taxIdNumber,
      description,
      websiteLink,
      rating,
      agentId,
    });

    await newAgency.save();
    res.json("Agency added");
  } catch (err) {
    console.error("Error adding agency:", err);
    res.status(400).json({ error: err.message });
  }
});

// Read all agencies
router.route("/getAllAgencies").get((req, res) => {
  Agency.find()
    .then((agencies) => {
      res.json(
        agencies.map((agency) => ({
          id: agency._id,
          agencyName: agency.agencyName,
          address: agency.address,
          img: agency.img,
          mobile: agency.mobile,
          businessRegistrationNumber: agency.businessRegistrationNumber,
          representerMail: agency.representerMail,
          businessMail: agency.businessMail,
          fax: agency.fax,
          taxIdNumber: agency.taxIdNumber,
          description: agency.description,
          websiteLink: agency.websiteLink,
          rating: agency.rating,
          agentId: agency.agentId,
        }))
      );
    })
    .catch((err) => {
      console.error("Error fetching agencies:", err); 
      res.status(500).json({ status: "Error fetching agencies", error: err.message });
    });
});

// Update agency
router.route("/update/:id").put((req, res) => {
  Agency.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Agency updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete agency
router.route("/delete/:id").delete((req, res) => {
  Agency.findByIdAndDelete(req.params.id)
    .then(() => res.json("Agency deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get specific agency
router.route("/getAgency/:id").get((req, res) => {
  Agency.findById(req.params.id)
    .then((agency) => res.json(agency))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
