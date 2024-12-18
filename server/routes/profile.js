// routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming a User model is set up for MongoDB

// PUT route to update user profile
router.put('/update-profile', async (req, res) => {
  const { email, name, phone, dob, bio } = req.body;
  console.log(req.body);

  try {
    // Update the user's name based on email
    console.log('before');
    const user = await User.findOneAndUpdate({email}, { fullName: name, phone: phone, dob: dob, bio: bio }, { new: true });
    console.log('user: ', user);

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/change-password', async (req, res) => {
  const { password, email } = req.body;
  
  try {
    // Update the user's name based on email
    const user = await User.findOneAndUpdate({email}, { password: password }, { new: true });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
})
module.exports = router;
