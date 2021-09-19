const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
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
});

StudentSchema.methods.resolve_subjects = function (cd) {
  return mongoose.model("Event");
};

module.exports = mongoose.model("Student", StudentSchema);
