const express = require('express');
const Spapackage = require('../models/spapackage');

const router = express.Router();

// Route for creating a new spapackage
router.post('/', async (req, res) => {
  try {
    const { description, spaPackageName, price } = req.body;

    const newSpapackage = new Spapackage({
      description,
      spaPackageName,
      price
    });

    const savedSpapackage = await newSpapackage.save();

    res.status(201).json(savedSpapackage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for getting all spa packages
router.get('/', async (req, res) => {
  try {
    const spapackages = await Spapackage.find();

    res.status(200).json(spapackages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for getting a single spapackage by id
router.get('/:id', async (req, res) => {
  try {
    const spapackage = await Spapackage.findById(req.params.id);

    if (!spapackage) {
      return res.status(404).json({ message: 'Spapackage not found' });
    }

    res.status(200).json(spapackage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for updating a spapackage by id
router.put('/:id', async (req, res) => {
  try {
    const updatedSpapackage = await Spapackage.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedSpapackage) {
      return res.status(404).json({ message: 'Spapackage not found' });
    }

    res.status(200).json(updatedSpapackage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for deleting a spapackage by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpapackage = await Spapackage.findByIdAndDelete(req.params.id);

    if (!deletedSpapackage) {
      return res.status(404).json({ message: 'Spapackage not found' });
    }

    res.status(200).json({ message: 'Spapackage deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
