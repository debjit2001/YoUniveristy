import React from 'react'

import styles from "./style.module.css";
const AttendanceStudentSemester = (buttonStyle,clickHandler,buttonText) => {
    return (
        <div>
            <button className="dropdown-item" type="button" style={styles.buttonStyle} onClick={clickHandler}>
                {buttonText}
            </button>
        </div>
    )
}

export default AttendanceStudentSemester
