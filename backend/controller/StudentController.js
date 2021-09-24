const Student = require("../models/Student");
const helperMethods = require("../utils/StudentHelper");
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

exports.get_student_details = async function (req, res) {
  const { roll } = req.params;
  let searchResponse = await helperMethods.search_Student(roll);
  const studentData = helperMethods.sanitize_function(searchResponse.body.info);
  searchResponse.body = { ...searchResponse.body, info: studentData };
  res.status(searchResponse.status).json({
    ...searchResponse.body,
  });
};
