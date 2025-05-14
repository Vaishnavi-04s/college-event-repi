// server/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { name, date, description, location, tags } = req.body;

    // Check if user exists, otherwise assign null to createdBy
    const createdBy = req.user ? req.user.id : null;

    const event = new Event({
      name,
      date,
      description,
      location,
      tags,
      createdBy, // If user is not authenticated, set as null
    });

    await event.save();

    // 🔔 Send notifications to matching users (if you have this functionality)
    sendPersonalizedEmails(event);

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Event creation failed', details: err.message });
  }
};
