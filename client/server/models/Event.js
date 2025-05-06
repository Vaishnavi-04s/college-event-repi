const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  image: String,
  createdBy: {
    type: String, 
    required: true,
  }
});

module.exports = mongoose.model("Event", eventSchema);
