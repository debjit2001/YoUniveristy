//Third party import
import React from "react";
//StyleSheet import
import styles from "./style.module.css";
const AttendanceStudentStream = ({
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

export default AttendanceStudentStream;
