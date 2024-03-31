const router = require("express").Router();
const Agency = require('../models/agencyModel');

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
            websiteLink
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
            websiteLink
        });

        await newAgency.save();
        res.json("Agency added");
    } catch (err) {
        console.error("Error adding agency:", err);
        res.status(400).json({ error: err.message });
    }
});

// Read all agencies
router.route("/").get((req, res) => {
    Agency.find()
        .then(agencies => res.json(agencies))
        .catch(err => res.status(400).json("Error: " + err));
});

// Update agency
router.route("/update/:id").put((req, res) => {
    Agency.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json("Agency updated"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete agency
router.route("/delete/:id").delete((req, res) => {
    Agency.findByIdAndDelete(req.params.id)
        .then(() => res.json("Agency deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get specific agency
router.route("/get/:id").get((req, res) => {
    Agency.findById(req.params.id)
        .then(agency => res.json(agency))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
