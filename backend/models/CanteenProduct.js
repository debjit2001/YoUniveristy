const mongoose = require("mongoose");

const CanteenProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  itemDetails: {
    type: String,
  },
  inCart: {
    type: Boolean,
  },
  count: {
    type: Number,
  },
});

module.exports = mongoose.model("CanteenProduct", CanteenProductSchema);
