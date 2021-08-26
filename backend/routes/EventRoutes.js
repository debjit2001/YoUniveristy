const router = require("express").Router();
const Events = require("../models/Event");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    //accept
    cb(null, true);
  } else {
    cb(new Error("Invalid File type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

//validation method
const validateRequest = (title, description) => {
  console.log(`Request Body:>>${title.length} and ${description}`);
  if (!title || !description) {
    return {
      status: 400,
      error: {
        message: "Invalid Request",
        error: "Missing Field(s)",
      },
    };
  } else {
    if (!title.length || !description.length) {
      return {
        status: 400,
        error: {
          message: "Invalid Request",
          error: "Empty value,Please provide valid input",
        },
      };
    } else if (title.length > 50) {
      return {
        status: 400,
        error: {
          message: "Out of length",
          error: "Too long title field value",
        },
      };
    } else if (description.length < 10) {
      return {
        status: 400,
        error: {
          message: "Description too short ",
          error: "Description length should be between 20 to 1000 characters",
        },
      };
    } else if (description.length > 1000) {
      return {
        status: 400,
        error: {
          message: "Description too long",
          error: "Description length should be between 20 to 1000 characters",
        },
      };
    } else {
      return null;
    }
  }
};

//posting events
router.post("/", upload.single("eventImage"), async (req, res) => {
  const { title, desc } = req.body;

  const validationResponse = validateRequest(title, desc);

  if (!validationResponse) {
    const event = new Events({
      title,
      desc,
      eventImage: req?.file?.path || null,
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
});

//fetch all the events
router.get("/", (req, res) => {
  Events.find()
    .exec()
    .then((events) => {
      if (events.length) {
        res.status(200).json({ events: events });
      } else {
        res.status(404).json({ events: [] });
      }
    })
    .catch((err) => {
      res.status(500).json({ events: [] });
    });
});

//desc:fetch single event by id
//METHOD:GET
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Events.findOne({ _id: id })
    .exec()
    .then((searchedEvent) => {
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
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error occured while searching for event with id:${id}`,
        searchedEvent: null,
      });
    });
});

module.exports = router;
