const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');

// Route to create a new room
router.post('/rooms', async (req, res) => {
  try {
    const { roomName, roomType, maxCount, image, description, price } = req.body;
    const room = new Room({ roomName, roomType, maxCount, image, description, price });
    await room.save();
    res.status(201).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a single room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a room by ID
router.patch('/rooms/:id', async (req, res) => {
  try {
    const allowedUpdates = ['roomName', 'roomType', 'maxCount', 'image', 'description', 'price'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete a room by ID
router.delete('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
