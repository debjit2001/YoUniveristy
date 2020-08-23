const mongoose = require("mongoose");

const FoundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: String,
  },
  foundDate: {
    type: String,
    required: true,
  },
  foundItemImage: {
    type: String,
  },
  foundItemDetails: {
    type: String,
    maxlength: 200,
  },
});

module.exports = mongoose.model("Found", FoundSchema);
