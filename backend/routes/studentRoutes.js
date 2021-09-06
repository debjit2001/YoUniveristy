const router = require("express").Router();
const StudentController = require("../controller/StudentController");

/**
 * DESC: GET THE DETAILS OF THE STUDENT WITH GIVER USERNAME
 * METHOD: GET
 * CONTROLLER:StudentController.get_STUDENT_details
 * ENDPOINT: /student/
 */

router.get("/", StudentController.get_all_students);

/**
 * DESC: REGISTER STUDENT
 * METHOD: POST
 * CONTROLLER:STUDENTController.register_STUDENT
 * ENDPOINT: /STUDENT/register
 */
//router.post("/register", STUDENTController.register_STUDENT);

module.exports = router;
