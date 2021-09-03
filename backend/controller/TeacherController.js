const _ = require("lodash");

const Teacher = require("../models/Teacher");

//helper methods
const helperMethods = require("../utils/TeacherHelper");

exports.register_teacher = async (req, res) => {
  const { username, email, password, registration_id } = req.body;

  const validationResponse = helperMethods.validate_user_input({
    username,
    email,
    password,
    registration_id,
  });

  if (validationResponse === true) {
    const searchResponse = await helperMethods.searchTeacher(username, email);
    if (searchResponse) {
      res.status(400).json({
        message: `Teacher already exists with the name: ${username} and email:${email}`,
        info: searchResponse,
      });
    } else {
      console.log("No user found,creating new user ....");

      const newTeacher = new Teacher({
        username,
        email,
        password,
        registration_id,
      });
      try {
        const teacherRegistrationResponse = await newTeacher.save();
        console.log(
          "🚀 ~ file: TeacherController.js ~ line 36 ~ exports.register_teacher= ~ teacherRegistrationResponse",
          teacherRegistrationResponse
        );
        if (teacherRegistrationResponse) {
          const sanitizedUser = helperMethods.sanitizeFunction(
            teacherRegistrationResponse
          );
          res.status(200).json({
            message: "Registration Successful",
            info: sanitizedUser,
          });
        } else {
          res.status(500).json({
            message: "Something went wrong!",
            info: teacherRegistrationResponse,
          });
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: TeacherController.js ~ line 56 ~ exports.register_teacher= ~ error",
          error
        );
        res.status(404).json({
          message: "Something went wrong!",
          info: error,
        });
      }
    }
  } else {
    res.status(400).json({
      error: `Bad Request! ${validationResponse} can not be empty`,
      field: validationResponse,
    });
  }
};

exports.get_teacher_details = async function (req, res) {
  const { username } = req.body;
  const searchResponse = await helperMethods.searchTeacher(username);
  res.status(searchResponse.status).json({
    ...searchResponse.body,
  });
};
