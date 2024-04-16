const router = require("express").Router();
const Agency = require('../models/agencyModel');
const asyncHandler = require('express-async-handler');

// Insert new agency
const addAgency = asyncHandler(async (req, res) => {
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
const allAgency = asyncHandler(async (req, res) => {
    Agency.find()
        .then(agencies => res.json(agencies))
        .catch(err => res.status(400).json("Error: " + err));
});

// Update agency
const updateAgency = asyncHandler(async (req, res) => {
    Agency.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json("Agency updated"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete agency
const deleteAgency = asyncHandler(async (req, res) => {
    Agency.findByIdAndDelete(req.params.id)
        .then(() => res.json("Agency deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get specific agency
const specificAgency = asyncHandler(async (req, res) => {
    Agency.findById(req.params.id)
        .then(agency => res.json(agency))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = {
    addAgency,
    allAgency,
    updateAgency,
    deleteAgency,
    specificAgency
  };
