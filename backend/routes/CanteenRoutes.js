const router = require("express").Router();
const CanteenProduct = require("../models/CanteenProduct");
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

//posting products
router.post("/", upload.single("imgUrl"), async (req, res) => {
  console.log(req.file);
  const product = new CanteenProduct({
    title: req.body.title,
    price: req.body.price,
    imgUrl: req.file.path,
    itemDetails: req.body.itemDetails,
    inCart: req.body.incart,
    count: req.body.count,
  });
  try {
    const newProd = await product.save();
    res.send(newProd);
  } catch (err) {
    res.status(400).send(err);
  }
});

//fetch all the products
router.get("/", async (req, res) => {
  try {
    const products = await CanteenProduct.find();
    console.log("products", products);
    res.json(products);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

//fetch single product
router.get("/:id", async (req, res) => {
  try {
    const product = await CanteenProduct.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await CanteenProduct.findById(req.params.id);
    if (product) {
      CanteenProduct.updateOne(
        { _id: req.params.id },
        req.body,
        (err, data) => {
          if (err) res.status(500).json({ msg: "Can't update" });
          if (data) res.status(200).json({ msg: "Update successful", data });
        }
      );
    } else {
      res.status(400).json({
        msg: "No product found",
      });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: CanteenRoutes.js ~ line 84 ~ router.put ~ err",
      err
    );
  }
});
module.exports = router;
