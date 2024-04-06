const router = require("express").Router();
const {addAgency,
    allAgency,
    updateAgency,
    deleteAgency,
    specificAgency} = require('../controllers/agencyController')

// Insert new agency
router.post("/add", addAgency)

// Read all agencies
router.get("/", allAgency)

// Update agency
router.put("/update/:id", updateAgency)

// Delete agency
router.delete("/delete/:id", deleteAgency)

// Get specific agency
router.get("/get/:id", specificAgency)

module.exports = router;
