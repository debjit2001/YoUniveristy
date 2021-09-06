const Student = require("../models/Student");

exports.get_all_students = async (req, res) => {
  try {
    const allStudents = await Student.find();

    if (!allStudents.length) {
      res.status(404).json({
        msg: "No Student found",
        students: allStudents,
      });
    } else {
      res.status(200).json({
        message: "Student found",
        students: allStudents,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      students: [],
      error: error,
    });
  }
};
