const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { name, date, description, location, tags, googleFormLink } = req.body;

    const createdBy = req.user ? req.user.userId : null;  // <--- Fix here

    const event = new Event({
      name,
      date,
      description,
      location,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      createdBy,
      googleFormLink,
      poster: req.file ? req.file.filename : null,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Event creation failed', details: err.message });
  }
};
