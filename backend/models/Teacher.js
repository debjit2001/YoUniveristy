const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registration_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
