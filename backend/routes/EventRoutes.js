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
router.get("/", async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

//fetch single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

module.exports = router;
