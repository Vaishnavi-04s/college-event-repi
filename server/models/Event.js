const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  tags: [String],
  poster: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  googleFormLink: { type: String, default: '' },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
