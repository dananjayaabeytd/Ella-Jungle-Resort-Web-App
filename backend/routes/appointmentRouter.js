const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create a new appointment
router.post('/appointments', async (req, res) => {
  try {
    const {
      NIC,
      firstName,
      lastName,
      address,
      contactNumber,
      appointmentType,
      appointmentDate,
    } = req.body;

    const newAppointment = new Appointment({
      NIC,
      firstName,
      lastName,
      address,
      contactNumber,
      appointmentType,
      appointmentDate,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get appointment by ID
router.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// Update appointment by ID
router.put('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Delete appointment by ID
router.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router;
