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

//desc:route for posting form for creating new lost entry
//METHOD:POST
router.post("/", upload.single("lostItemImage"), (req, res) => {
  const { name, email, itemName, lostDate, lostItemDetails } = req.body;
  if (
    !name ||
    !email ||
    !itemName ||
    !lostDate ||
    !lostItemDetails ||
    req.file === undefined
  ) {
    res.status(400).json({ newLostEntry: null });
  } else {
    const newLostItem = new Lost({
      name: req.body.name,
      email: req.body.email,
      itemName: req.body.itemName,
      lostDate: req.body.lostDate,
      lostItemImage: req.file.path,
      lostItemDetails: req.body.lostItemDetails,
    });

    newLostItem
      .save()
      .then((newEntry) => {
        res.status(200).json({ newLostEntry: newEntry });
      })
      .catch((err) => {
        res.status(500).json({ newLostEntry: null });
      });
  }
});

//desc:fetch all the events
//METHOD:GET
router.get("/", (req, res) => {
  Lost.find()
    .exec()
    .then((lostItems) => {
      if (lostItems && lostItems.length) {
        res.status(200).json({ lostItems: lostItems });
      } else {
        res.status(404).json({ lostItems: lostItems });
      }
    })
    .catch((err) => {
      res.status(500).json({ lostItems: [] });
    });
});

//desc:fetch single event based on id passed as url parameter
//METHOD:GET
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Lost.findOne({ _id: id })
    .then((searchedLostEntry) => {
      if (searchedLostEntry) {
        res.status(200).json({ searchdItem: searchedLostEntry });
      } else {
        res.status(404).json({ searchedItem: null });
      }
    })
    .catch((err) => {
      res.status(500).json({ searchedItem: null });
    });
});

module.exports = router;
