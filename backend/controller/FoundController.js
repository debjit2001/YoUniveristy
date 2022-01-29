const cloudinary = require("../utils/cloudinary");
const Found = require("../models/Found");
const helperMethods = require("../utils/FoundHelper");
const mailerConfig = require("../config/mailerConfig");

//function to send email whenever a item found is registered
const mailHandler = async (email, itemName, name) => {
  let mailOptions = {
    from: "Youniversity.official.2022@gmail.com",
    to: email,
    subject: `Found Item registered`,
    html: `
    <p>Hey <b>${name}</b>,</p>
    <p>Your entry for item <b>${itemName}</b> has been registered successfully.</p>
    <p>Thanks and Regards ,</p>
    <h2>Team YOUniversity</h2>
    `,
  };

  mailerConfig.transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.create_found_entry = async (req, res) => {
  const { name, email, itemName, foundDate, foundItemDetails } = req.body;
  const validationResponse = helperMethods.validateRequest(
    name,
    email,
    itemName,
    foundDate,
    foundItemDetails,
    req
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
        const newEntry = await newFoundItem.save();
        res.status(200).json({ newFoundEntry: newEntry });
        mailHandler(email, itemName, name);
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
