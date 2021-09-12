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

exports.search_teacher = async (username = "", email = "", id = null) => {
  let searchResult;
  if (email.length) {
    searchResult = await Teacher.findOne({ username, email });
    return searchResult;
  }
  if (username.length) {
    //search by teacher username
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
  } else {
    //search by teacher id
    try {
      searchResult = await Teacher.findOne({ _id: id });
    } catch (error) {
      searchResult = null;
    }
    return searchResult
      ? {
          isFound: true,
          teacher_details: searchResult,
        }
      : {
          isFound: false,
          teacher_details: searchResult,
        };
  }
};

exports.sanitize_function = (teacherModel) => {
  const newTeacherData = { ...teacherModel._doc };
  delete newTeacherData.password;
  delete newTeacherData.registration_id;
  delete newTeacherData.__v;
  return newTeacherData;
};
