const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
  },
});

module.exports = mongoose.model("Events", EventSchema);
