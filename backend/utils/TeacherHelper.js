const Teacher = require("../models/Teacher");
const _ = require("lodash");

exports.validate_user_input = (userData) => {
  const { username, email, password, registration_id } = userData;
  if (!username.length) return "username";
  else if (!email.length) return "email";
  else if (!password.length) return "password";
  else if (!registration_id.length) return "registration_id";
  else return true;
};

exports.search_teacher = async (username, email = "") => {
  let searchResult;
  if (email.length) {
    searchResult = await Teacher.findOne({ username, email });
    return searchResult;
  }

  //search for getting details of Teacher
  searchResult = await Teacher.findOne({ username });
  return searchResult
    ? {
        status: 200,
        body: {
          message: `Teacher Found with the name : ${username}`,
          info: searchResult,
        },
      }
    : {
        status: 404,
        body: {
          message: `No Teacher Found with the name : ${username}`,
          info: searchResult,
        },
      };
};

exports.sanitize_function = (teacherModel) => {
  const newTeacherData = { ...teacherModel._doc };
  delete newTeacherData.password;
  delete newTeacherData.registration_id;
  return newTeacherData;
};
