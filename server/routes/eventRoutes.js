const express = require('express');
<<<<<<< HEAD
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
=======
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Event = require('../models/Event');
const { sendRegistrationEmail } = require('../utils/emailService');
const User = require('../models/User');

//GET /api/events/:id 
router.get('/:id', async (req, res) => {
try {
const event = await Event.findById(req.params.id);
if (!event) return res.status(404).json({ message: 'Event not found' });
res.json(event);
} catch (err) {
console.error('Error fetching event by ID:', err);
res.status(500).json({ message: 'Failed to fetch event' });
}
});

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
router.post('/', authMiddleware, async (req, res) => {
  const { name, date, description, location, tags } = req.body;

  try {
    const newEvent = new Event({
      name,
      date,
      description,
      location,
      tags,
    });

    await newEvent.save();

    // Find users with matching tags
    const matchingUsers = await User.find({
      tags: { $in: tags }
    });

    // Send email notifications
    for (const user of matchingUsers) {
      try {
        await sendRegistrationEmail(user.email, user.name, newEvent.name); // You can customize this to include event info
      } catch (err) {
        console.error(`Failed to send email to ${user.email}:`, err);
      }
    }

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
     console.log('Fetched events:', events); // ← check this output
    res.json(events);
  } catch (err) {
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    res.status(500).json({ message: 'Error fetching events' });
  }
});

<<<<<<< HEAD
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
=======
// PUT /api/events/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).send('Event not found');
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// DELETE /api/events/:id
// Inside your route file (e.g., events.js)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.remove(); // Remove the event from the database
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    res.status(500).json({ message: 'Error deleting event' });
  }
});

<<<<<<< HEAD
=======
// POST /api/events/:id/notify
router.post('/:id/notify', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const matchingUsers = await User.find({
      tags: { $in: event.tags }
    });

    for (const user of matchingUsers) {
      try {
        await sendRegistrationEmail(user.email, user.name, event.name); // You can modify to include more info
      } catch (err) {
        console.error(`Failed to send email to ${user.email}:`, err);
      }
    }

    res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (err) {
    console.error('Error in /notify route:', err);
    res.status(500).json({ message: 'Failed to send notifications' });
  }
});

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

module.exports = router;
