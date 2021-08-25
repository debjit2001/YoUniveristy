const router = require("express").Router();
const Found = require("../models/Found");
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
router.post("/", upload.single("foundItemImage"), (req, res) => {
  console.info("Received request...");
  const { name, email, itemName, foundDate, foundItemDetails } = req.body;

  if (
    !name ||
    !email ||
    !itemName ||
    !foundDate ||
    !foundItemDetails ||
    req.file === undefined
  ) {
    res.status(400).json({ newFoundEntry: null });
  } else {
    const newFoundItem = new Found({
      name: req.body.name,
      email: req.body.email,
      itemName: req.body.itemName,
      foundDate: req.body.foundDate,
      foundItemImage: req.file.path,
      foundItemDetails: req.body.foundItemDetails,
    });

    newFoundItem
      .save()
      .then((newEntry) => {
        res.status(200).json({ newFoundEntry: newEntry });
      })
      .catch((err) => {
        res.status(500).json({ newFoundEntry: null });
      });
  }
});

//fetch all the events
router.get("/", async (req, res) => {
  try {
    const foundItems = await Found.find();
    res.json(foundItems);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

module.exports = router;
