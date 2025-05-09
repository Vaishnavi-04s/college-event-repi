const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Event = require('../models/Event');

// GET /api/events/admin/:adminId
router.get('/admin/:adminId', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const events = await Event.find({ createdBy: adminId });
    res.json(events);
  } catch (err) {
    console.error('Error fetching admin events:', err);
    res.status(500).json({ message: 'Failed to fetch admin events' });
  }
});

// POST /api/events
router.post('/',authMiddleware, async (req, res) => {
  const { name, date, description, location, tags } = req.body;

  try {
    const newEvent = new Event({
      name,
      date,
      description,
      location,
      tags,
      // Optional: createdBy: req.user?.id if using authentication
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// GET /api/events
router.get('/', authMiddleware, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

module.exports = router;
