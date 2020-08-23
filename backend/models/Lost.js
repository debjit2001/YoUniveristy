const mongoose = require("mongoose");

const LostSchema = new mongoose.Schema({
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
  lostDate: {
    type: String,
    required: true,
  },
  lostItemImage: {
    type: String,
  },
  lostItemDetails: {
    type: String,
    maxlength: 200,
  },
});

module.exports = mongoose.model("Lost", LostSchema);
