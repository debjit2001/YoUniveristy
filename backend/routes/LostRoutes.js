const router = require("express").Router();
const lostController = require("../controller/LostController");
const upload = require("../utils/multer");

//desc:route for posting form for creating new lost entry
//METHOD:POST
router.post(
  "/",
  upload.single("lostItemImage"),
  lostController.create_lost_entry
);

//desc:fetch all the events
//METHOD:GET
router.get("/", lostController.fetch_all_lost_entry);

//desc:fetch single event based on id passed as url parameter
//METHOD:GET
router.get("/:id", lostController.fetch_lost_item);

module.exports = router;
