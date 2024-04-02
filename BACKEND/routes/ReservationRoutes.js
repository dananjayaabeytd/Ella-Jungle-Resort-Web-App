const express = require('express');
const router = express.Router();
let Reservation = require("../models/ActivityReservation");



router.route("/apply").post((req,res)=>{

    const {activityID,guestID,activityName} = req.body;

    const newReservation = new Reservation({
        activityID,
        guestID,
        activityName
    })

    newReservation.save().then(()=>{
        res.json("Apply Condirmed")
    }).catch((err)=>{
        console.log(err);
    })


})





module.exports = router;