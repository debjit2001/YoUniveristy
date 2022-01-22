const Lost = require("../models/Lost");
const cloudinary = require("../utils/cloudinary");
const helperMethods = require("../utils/LostHelper");

exports.create_lost_entry = async (req, res) => {
  const { name, email, itemName, lostDate, lostItemDetails } = req.body;
  const validationResponse = helperMethods.validateRequest(
    name,
    email,
    itemName,
    lostDate,
    lostItemDetails
  );
  if (!validationResponse) {
    res.status(400).json({ newLostEntry: null });
  } else {
    try {
      let imageUploadResponse = await cloudinary.uploader.upload(req.file.path);

      imageUploadResponse = imageUploadResponse.secure_url;

      const newLostItem = new Lost({
        name: name,
        email: email,
        itemName: itemName,
        lostDate: lostDate,
        lostItemImage: imageUploadResponse,
        lostItemDetails: lostItemDetails,
      });
      try {
        const newEntry = await newLostItem().save();
        res.status(200).json({ newLostEntry: newEntry });
      } catch (saveError) {
        res.status(500).json({ newLostEntry: null });
      }
    } catch (error) {
      res.status(500).json({ newLostEntry: null });
    }
  }
};

exports.fetch_all_lost_entry = async (req, res) => {
  try {
    const lostItems = await Lost.find();
    if (lostItems.length) {
      res.status(200).json({ lostItems: lostItems });
    } else {
      res.status(404).json({ lostItems: lostItems });
    }
  } catch (err) {
    res.status(500).json({ lostItems: [] });
  }
};

exports.fetch_lost_item = async (req, res) => {
  const { id } = req.params;

  try {
    const searchEntry = Lost.findOne({ _id: id });
    if (searchEntry) {
      res.status(200).json({ searchdItem: searchEntry });
    } else {
      res.status(404).json({ searchedItem: null });
    }
  } catch (err) {
    res.status(500).json({ searchedItem: null });
  }
};
