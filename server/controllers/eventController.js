<<<<<<< HEAD
=======
// server/controllers/eventController.js
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, date, description, location, tags, googleFormLink } = req.body;

    const createdBy = req.user ? req.user.userId : null;  // <--- Fix here
=======
    const { name, date, description, location, tags } = req.body;

    // Check if user exists, otherwise assign null to createdBy
    const createdBy = req.user ? req.user.id : null;
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

    const event = new Event({
      name,
      date,
      description,
      location,
<<<<<<< HEAD
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      createdBy,
      googleFormLink,
      poster: req.file ? req.file.filename : null,
    });

    await event.save();
=======
      tags,
      createdBy, // If user is not authenticated, set as null
    });

    await event.save();

    // 🔔 Send notifications to matching users (if you have this functionality)
    sendPersonalizedEmails(event);

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Event creation failed', details: err.message });
  }
};
