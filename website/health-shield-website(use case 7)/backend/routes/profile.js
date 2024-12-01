const express = require('express');
const router = express.Router();

// Dummy profile data - in a real app, fetch this from the database
const userProfile = {
    id: 1,
    name: 'John Doe',
    conditions: ['Diabetes', 'Hypertension'],
    medications: ['Metformin', 'Lisinopril'],
};

// Get user profile data
router.get('/', (req, res) => {
    res.json(userProfile);
});

module.exports = router;
