const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.use(express.json());

//Route to create reservation
router.post('/booking', async(req, res) => {
    try {
        
        const {roomID, fullName, email, contactNumber, checkIn, checkOut} = req.body;
        const reservation = new Reservation({roomID, fullName, email, contactNumber, checkIn, checkOut});
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;