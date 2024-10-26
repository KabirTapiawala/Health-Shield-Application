// // Inside /server/routes/profile.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Get user profile
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching profile' });
//   }
// });

// // Update user profile
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating profile' });
//   }
// });

// module.exports = router;
