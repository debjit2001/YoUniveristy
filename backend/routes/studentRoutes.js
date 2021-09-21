const router = require("express").Router();
const StudentController = require("../controller/StudentController");

/**
 * DESC: GET THE DETAILS OF ALL THE STUDENT 
 * METHOD: GET
 * CONTROLLER:StudentController.get_all_students
 * ENDPOINT: /student/
 */

router.get("/", StudentController.get_all_students);

/**
 * DESC: GET THE DETAILS OF THE STUDENT BASED ON ROLL 
 * METHOD: GET
 * CONTROLLER:StudentController.get_student_details
 * ENDPOINT: /student/:roll
 */

router.get("/:roll",StudentController.get_student_details);
/**
 * DESC: REGISTER STUDENT
 * METHOD: POST
 * CONTROLLER:STUDENTController.register_STUDENT
 * ENDPOINT: /STUDENT/register
 */
//router.post("/register", STUDENTController.register_STUDENT);

module.exports = router;
