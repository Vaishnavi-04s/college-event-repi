const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const Event = require('../models/Event');

// ✅ Admin-specific route to fetch events they organized
router.get('/admin/:adminId', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const events = await Event.find({ createdBy: adminId });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post("/", async (req, res) => {
  const { title, description, date, image, createdBy } = req.body;
  const newEvent = new Event({
    title,
    description,
    date,
    image,
    createdBy,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
