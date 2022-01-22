import React from "react";

import styles from "./style.module.css";
const AttendanceStudentSemester = ({
  buttonStyle,
  clickHandler,
  buttonText,
}) => {
  const _onClickHandler = (e) => {
    clickHandler(e);
  };
  return (
    <div>
      {console.log(buttonStyle)}
      <button
        className={`dropdown-item ${styles.buttonStyle}`}
        type="button"
        onClick={_onClickHandler}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AttendanceStudentSemester;
