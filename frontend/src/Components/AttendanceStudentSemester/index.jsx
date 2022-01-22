import React from "react";

import styles from "./style.module.css";
const AttendanceStudentSemester = ({
  buttonStyle,
  clickHandler,
  buttonText,
}) => {
  return (
    <div>
      <button
        className={`dropdown-item ${styles[buttonStyle]}`}
        type="button"
        onClick={()=>clickHandler(buttonText)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AttendanceStudentSemester;
