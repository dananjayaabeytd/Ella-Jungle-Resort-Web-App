const express = require('express');
const Appointment = require('../models/appointment.js');

const router = express.Router();

// Route for creating a new appointment
router.post('/', async (req, res) => {
  try {
    const {  NIC,firstName, lastName, address, contactNumber, appointmentTypes, appointmentDate, totalPrice, status } = req.body;

    const newAppointment = new Appointment({
      NIC,
      firstName,
      lastName,
      address,
      contactNumber,
      appointmentTypes,
      appointmentDate,
      totalPrice,
      status
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Route for getting all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json({
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Route for getting a single appointment by id
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Route for updating an appointment by id
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Route for deleting an appointment by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = router;
