const Student=require("../models/Student");
const _ = require("lodash");

exports.search_Student = async (roll = "", email = "", id = null) => {
    let searchResult;
    if (email.length) {
      searchResult = await Student.findOne({ roll, email });
      return searchResult;
    }
    if (roll.length) {
      //search by teacher username
      searchResult = await Student.findOne({ roll });
      return searchResult
        ? {
            status: 200,
            body: {
              message: `Student Found with the roll : ${roll}`,
              info: searchResult,
            },
          }
        : {
            status: 404,
            body: {
              message: `No Student Found with the roll : ${roll}`,
              info: searchResult,
            },
          };
    } else {
      //search by teacher id
      try {
        searchResult = await Student.findOne({ _id: id });
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
  
  exports.sanitize_function = (StudentModel) => {
    const newStudentData = { ...StudentModel._doc };
    delete newStudentData.password;
    //delete newStudentData.registration_id;
    //delete newStudentData.__v;
    return newStudentData;
  };