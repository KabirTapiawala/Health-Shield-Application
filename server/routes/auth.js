const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Signup Route
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(password);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    // Create new user
    console.log(password)
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    console.log(newUser.password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with:', req.body);


  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Check password
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Create and send JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected Route Example (e.g., Get User Profile)
router.get('/profile', async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ fullName: user.fullName, email: user.email });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
