const express = require('express');
const Prescription = require('../models/Prescription');

const router = express.Router();

// Add a new prescription
router.post('/', async (req, res) => {
  try {
    const { email, name, dosage } = req.body;

    // Validate required fields
    if (!email || !name || !dosage) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const prescription = new Prescription({ email, name, dosage });
    console.log(prescription);
    await prescription.save();

    res.status(201).json({ message: 'Prescription added successfully', prescription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add prescription' });
  }
});

// Get prescriptions for a user by email
router.get('/:email', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ email: req.params.email });

    if (!prescriptions.length) {
      return res.status(404).json({ message: 'No prescriptions found for this email.' });
    }

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

module.exports = router;
