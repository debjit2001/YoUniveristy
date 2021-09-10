const router = require("express").Router();
const teacherController = require("../controller/TeacherController");

/**
 * DESC: GET THE DETAILS OF THE TEACHER WITH GIVER USERNAME
 * METHOD: GET
 * CONTROLLER:teacherController.get_teacher_details
 * ENDPOINT: /teacher/
 */

router.get("/", teacherController.get_teacher_details);

/**
 * DESC: REGISTER TEACHER
 * METHOD: POST
 * CONTROLLER:teacherController.register_teacher
 * ENDPOINT: /teacher/register
 */
router.post("/register", teacherController.register_teacher);

/**
 * DESC: UPDATE TEACHER
 * METHOD: PUT
 * CONTROLLER:teacherController.update_teacher
 * ENDPOINT: /teacher/update/:id
 */
router.post("/update/:id", teacherController.update_teacher);

module.exports = router;
