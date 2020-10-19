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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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

//posting events
router.post("/", upload.single("eventImage"), async (req, res) => {
  console.log(req.file);
  const event = new Events({
    title: req.body.title,
    desc: req.body.desc,
    eventImage: req.file.path,
  });
  try {
    const newEvent = await event.save();
    res.send(newEvent);
  } catch (err) {
    res.status(400).send(err);
  }
});

//fetch all the events
router.get("/", (req, res) => {
  Events.find()
    .exec()
    .then((events) => {
      if (events.length) {
        console.log("Events Found!!!");
        res.status(200).json({ events: events });
      } else {
        console.log("No events found");
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
        console.log(`Event Found with id : ${id}`, searchedEvent);
        res.status(200).json({
          message: `Event Found with id : ${id}`,
          searchedEvent: searchedEvent,
        });
      } else {
        console.log(`No event Found with id : ${id}`);
        res.status(404).json({
          message: `No event Found with id : ${id}`,
          searchedEvent: null,
        });
      }
    })
    .catch((error) => {
      console.log(
        `Error occured while searching for event with id:${id}`,
        error
      );
      res.status(500).json({
        message: `Error occured while searching for event with id:${id}`,
        searchedEvent: null,
      });
    });
});

module.exports = router;
