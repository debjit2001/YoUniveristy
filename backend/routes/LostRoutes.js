const router = require("express").Router();
const Lost = require("../models/Lost");
const multer = require("multer");

//multer connfig
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

//route for posting form
router.post("/", upload.single("lostItemImage"), async (req, res) => {
  const lostItem = new Lost({
    name: req.body.name,
    email: req.body.email,
    itemName: req.body.itemName,
    lostDate: req.body.lostDate,
    lostItemImage: req.file.path,
    lostItemDetails: req.body.lostItemDetails,
  });
  try {
    const lost = await lostItem.save();
    res.send(lost);
  } catch (err) {
    res.status(400).send(err);
  }
});

//fetch all the events
router.get("/", async (req, res) => {
  try {
    const lostItems = await Lost.find();
    res.json(lostItems);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

module.exports = router;
