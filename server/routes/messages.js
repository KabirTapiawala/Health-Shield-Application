// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get messages by user email (for both sender and receiver)
router.get('/:email', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.params.email }, { receiver: req.params.email }],
    }).sort({ createdAt: 1 }); // Sort by date
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Post a new message
router.post('/', async (req, res) => {
  const { sender, receiver, text } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, text });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

module.exports = router;
