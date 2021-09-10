const router = require("express").Router();
const upload = require("../utils/multer");
const eventController = require("../controller/EventController");

//posting events
router.post("/", upload.single("eventImage"), eventController.create_event);

//fetch all the events
router.get("/", eventController.fetch_all_events);

//desc:fetch single event by id
//METHOD:GET
router.get("/:id", eventController.fetch_event);

module.exports = router;
