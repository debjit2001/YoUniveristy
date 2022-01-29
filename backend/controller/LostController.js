const Lost = require("../models/Lost");
const cloudinary = require("../utils/cloudinary");
const helperMethods = require("../utils/LostHelper");
const mailerConfig = require("../config/mailerConfig");
//function to send email whenever a item lost is registered
const mailHandler = async (email, itemName, name) => {
  let mailOptions = {
    from: "Youniversity.official.2022@gmail.com",
    to: email,
    subject: `Lost Item registered`,
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
exports.create_lost_entry = async (req, res) => {
  const { name, email, itemName, lostDate, lostItemDetails } = req.body;
  const validationResponse = helperMethods.validateRequest(
    name,
    email,
    itemName,
    lostDate,
    lostItemDetails,
    req
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
        const newEntry = await newLostItem.save();
        res.status(200).json({ newLostEntry: newEntry });
        mailHandler(email, itemName, name);
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
