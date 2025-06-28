const Event = require('../models/Event');

const ownershipMiddleware = async (req, res, next) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to modify this event' });
    }

    next();
  } catch (err) {
    console.error('Ownership middleware error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = ownershipMiddleware;
