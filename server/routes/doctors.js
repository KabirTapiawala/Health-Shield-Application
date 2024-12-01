const express = require('express');
const Doctor = require('../models/Doctor'); // Make sure this path is correct
const router = express.Router(); // Only declare router once here

// GET endpoint to fetch all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
});

module.exports = router; // Export the router once
