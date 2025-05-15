const express = require('express');
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
    res.status(500).json({ message: 'Error fetching events' });
  }
});

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
    res.status(500).json({ message: 'Error deleting event' });
  }
});



module.exports = router;
