const Events = require("../models/Event");
const cloudinary = require("../utils/cloudinary");
const helperMethods = require("../utils/EventHelper");

exports.create_event = async (req, res) => {
  const { title, desc } = req.body;

  const validationResponse = helperMethods.validateRequest(title, desc);

  if (!validationResponse) {
    let imageUploadResponse = null;

    if (req.file) {
      imageUploadResponse = await cloudinary.uploader.upload(req.file.path);

      imageUploadResponse = imageUploadResponse.secure_url;
    }

    const event = new Events({
      title,
      desc,
      eventImage: imageUploadResponse,
    });

    try {
      const newEvent = await event.save();
      res.status(200).json({
        message: "Event Created Successfully",
        event: newEvent,
      });
    } catch (err) {
      res.status(500).json({
        message: "Something Went Wrong",
        error: err.message,
      });
    }
  } else {
    res.status(validationResponse.status).json({
      ...validationResponse.error,
    });
  }
};

exports.fetch_all_events = async (req, res) => {
  try {
    const response = await Events.find();

    if (response.length) {
      res.status(200).json({ events: response });
    } else {
      res.status(404).json({ events: response });
    }
  } catch (error) {
    res.status(500).json({ events: [] });
  }
};

exports.fetch_event = async (req, res) => {
  const { id } = req.params;
  try {
    const searchedEvent = await Events.findOne({ _id: id });
    if (searchedEvent) {
      res.status(200).json({
        message: `Event Found with id : ${id}`,
        searchedEvent: searchedEvent,
      });
    } else {
      res.status(404).json({
        message: `No event Found with id : ${id}`,
        searchedEvent: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error occured while searching for event with id:${id}`,
      searchedEvent: null,
    });
  }
};
