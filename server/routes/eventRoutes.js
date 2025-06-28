const express = require('express');
const multer = require('multer');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');
const ownershipMiddleware = require('../middleware/ownershipMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Create new event
router.post('/create', authMiddleware, upload.single('poster'), async (req, res) => {
  try {
    const { name, description, date, location, tags, googleFormLink } = req.body;

    const newEvent = new Event({
      name,
      description,
      date,
      location,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      googleFormLink,
      poster: req.file?.filename || '',
      createdBy: req.user.userId,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Edit event - ownership protected!
router.put('/:id', authMiddleware, ownershipMiddleware, upload.single('poster'), async (req, res) => {
  try {
    const { name, description, date, location, tags, googleFormLink } = req.body;

    const updateFields = {
      name,
      description,
      date,
      location,
      googleFormLink,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
    };

    if (req.file) {
      updateFields.poster = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Error updating event' });
  }
});
// Delete event - ownership protected
router.delete('/:id', authMiddleware, ownershipMiddleware, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Error deleting event' });
  }
});


module.exports = router;
