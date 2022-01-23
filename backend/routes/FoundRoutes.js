const router = require("express").Router();
const foundController = require("../controller/FoundController");
const upload = require("../utils/multer");

//desc:route for posting form for creating new lost entry
//METHOD:POST
router.post(
  "/",
  upload.single("foundItemImage"),
  foundController.create_found_entry
);

//desc:fetch all the events
//METHOD:GET
router.get("/", foundController.fetch_all_found_entry);

//desc:fetch single event based on id passed as url parameter
//METHOD:GET
router.get("/:id", foundController.fetch_found_item);

module.exports = router;
