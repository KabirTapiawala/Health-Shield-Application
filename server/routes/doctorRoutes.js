const express = require('express');
const Doctor = require('../models/Doctor'); // Import the Doctor model
const router = express.Router();

// GET route for fetching doctors
router.get('/', async (req, res) => {
  const { name, location, specialty } = req.query;

  const searchCriteria = {};
  if (name) searchCriteria.name = { $regex: name, $options: 'i' };
  if (location) searchCriteria.location = { $regex: location, $options: 'i' };
  if (specialty) searchCriteria.specialty = { $regex: specialty, $options: 'i' };

  try {
    const doctors = await Doctor.find(searchCriteria);
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
