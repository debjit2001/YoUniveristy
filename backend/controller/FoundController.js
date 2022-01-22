const Found = require("../models/Found");
const cloudinary = require("../utils/cloudinary");

exports.create_found_entry = async (req, res) => {
  const { name, email, itemName, foundDate, foundItemDetails } = req.body;
  const validationResponse = helperMethods.validateRequest(
    name,
    email,
    itemName,
    foundDate,
    foundItemDetails
  );
  if (!validationResponse) {
    res.status(400).json({ newFoundEntry: null });
  } else {
    try {
      let imageUploadResponse = await cloudinary.uploader.upload(req.file.path);

      imageUploadResponse = imageUploadResponse.secure_url;

      const newFoundItem = new Found({
        name: name,
        email: email,
        itemName: itemName,
        foundDate: foundDate,
        foundItemImage: imageUploadResponse,
        foundItemDetails: foundItemDetails,
      });
      try {
        const newEntry = await newFoundItem().save();
        res.status(200).json({ newFoundEntry: newEntry });
      } catch (saveError) {
        res.status(500).json({ newFoundEntry: null });
      }
    } catch (error) {
      res.status(500).json({ newFoundEntry: null });
    }
  }
};

exports.fetch_all_found_entry = async (req, res) => {
  try {
    const foundItems = await Found.find();
    if (foundItems.length) {
      res.status(200).json({ foundItems: foundItems });
    } else {
      res.status(404).json({ foundItems: foundItems });
    }
  } catch (err) {
    res.status(500).json({ foundItems: [] });
  }
};

exports.fetch_found_item = async (req, res) => {
  const { id } = req.params;

  try {
    const searchEntry = Found.findOne({ _id: id });
    if (searchEntry) {
      res.status(200).json({ searchdItem: searchEntry });
    } else {
      res.status(404).json({ searchedItem: null });
    }
  } catch (err) {
    res.status(500).json({ searchedItem: null });
  }
};
