// routes/rooms.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Room = require('../models/Rooms');

router.use(express.json());

// Route to create reservation
router.post('/booking', async (req, res) => {
    try {
        const { roomID,userID, fullName, email, contactNumber, checkIn, checkOut } = req.body;
        const reservation = new Reservation({ roomID,userID, fullName, email, contactNumber, checkIn, checkOut });
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Filter and get available rooms
router.get('/available-rooms', async (req, res) => {
    try {
        const { roomcheckIn, roomcheckOut, roomType } = req.query;
        //console.log('Check-in:', roomcheckIn);
        //console.log('Check-out:', roomcheckOut);
        //console.log('Room type:', roomType);

        const bookedRoomIds = await getBookedRooms(roomcheckIn,roomcheckOut);
        console.log('Booked room IDs:', bookedRoomIds);

        const availableRooms = await Room.find({
            roomType: roomType,
            _id: { $nin: bookedRoomIds }
        });
        //console.log('Available rooms:', availableRooms);

        res.status(200).send(availableRooms);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
});

const getBookedRooms = async (roomcheckIn, roomcheckOut) => {
    const bookedRooms = await Reservation.find({
        $or: [
            { checkIn: { $gte: roomcheckIn, $lte: roomcheckOut } },
            { checkOut: { $gte: roomcheckIn, $lte: roomcheckOut } }
        ]
    });
    return bookedRooms.map(reservation => reservation.roomID);
};

// Route to get all reservations
router.get('/bookings', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).send(reservations);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Route to get user reservations
router.get('/myReservations/:id', async (req, res) => {
    try {
        const reservations = await Reservation.find({ userID: req.params.id });
        console.log(reservations);
        res.status(200).send(reservations);
    } catch (error) {
        res.status(400).send(error);
    }
});




// //Vilan
// // Route to delete a reservation by ID
// router.delete('/deleteReservation/:id', async (req, res) => {
//     try {
//         const reservationId = req.params.id;
//         // Attempt to find and delete the reservation
//         const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
//         if (!deletedReservation) {
//             // If reservation is not found, send 404 response
//             return res.status(404).send({ status: "Reservation not found" });
//         }
//         // If reservation is found and deleted successfully, send 200 response with deleted reservation data
//         res.status(200).send({ status: "Reservation deleted", reservation: deletedReservation });
//     } catch (error) {
//         // If any error occurs during the process, send 500 response with error message
//         console.error('Error deleting reservation:', error.message);
//         res.status(500).send({ status: "Error deleting reservation", error: error.message });
//     }
// });



module.exports = router;
