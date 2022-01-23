//Third Party Import
import React from "react";
//StyleSheet Import
import styles from "./style.module.css";
const AttendanceStudentSemester = ({
  buttonStyle,
  clickHandler,
  buttonText
}) => {
  return (
    <div>
      <button
        className={`btn btn-primary btn-lg btn-block ${styles[buttonStyle]}`}
        type="button"
        onClick={()=>clickHandler(buttonText)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AttendanceStudentSemester;
