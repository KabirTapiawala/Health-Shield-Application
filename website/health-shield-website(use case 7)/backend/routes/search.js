const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Search for doctors
router.get('/', async (req, res) => {
    const { name, location, specialty } = req.query;
    try {
        const doctors = await Doctor.find({
            name: { $regex: name || '', $options: 'i' },
            location: { $regex: location || '', $options: 'i' },
            specialty: { $regex: specialty || '', $options: 'i' }
        });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
