const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  tags: [String],
  poster: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  googleFormLink: { type: String, default: '' },
}, { timestamps: true });
=======
  name: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  tags: [String],
  
});
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
