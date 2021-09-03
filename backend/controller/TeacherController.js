const _ = require("lodash");

const Teacher = require("../models/Teacher");
const { search } = require("../routes/TeacherRoute");

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
    const searchResponse = await helperMethods.search_teacher(username, email);
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
        if (teacherRegistrationResponse) {
          const sanitizedUser = helperMethods.sanitize_function(
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
  let searchResponse = await helperMethods.search_teacher(username);
  const teacherData = helperMethods.sanitize_function(searchResponse.body.info);
  searchResponse.body = { ...searchResponse.body, info: teacherData };
  res.status(searchResponse.status).json({
    ...searchResponse.body,
  });
};
