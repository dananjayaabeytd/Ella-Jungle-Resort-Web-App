const express = require('express');
const router = express.Router();
let Reservation = require("../models/ActivityReservation");





router.post("/confirmactivity/:id", (req, res) => {


    // Fetch the activity ID from the URL parameter
    let activityId = req.params.id; 

    //set a default value for guestID
    const defaultGuestID ="660793227a87f77d585cca4b";

    // Extract  activity name from the request body
    const activityName  = req.body.activityName; 

    const newReservation = new Reservation({
        activityID: activityId, // Assign the fetched activity ID
        guestID: defaultGuestID,
        activityName: activityName
    });

    newReservation.save().then(() => {
        res.json("Apply");
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while confirming the application" });
    });
});




module.exports = router;