// routes/doctorRoutes.js
const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

app.get('/api/doctors', async (req, res) => {
    const { name, location, specialty } = req.query;
  
    // Build the search criteria based on provided filters
    const searchCriteria = {};
    if (name) searchCriteria.name = { $regex: name, $options: 'i' };  // Case-insensitive search for name
    if (location) searchCriteria.location = { $regex: location, $options: 'i' };
    if (specialty) searchCriteria.specialty = { $regex: specialty, $options: 'i' };  // Filter by specialty
  
    try {
      const doctors = await Doctor.find(searchCriteria);
      res.json(doctors);  // Send filtered doctors back
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
