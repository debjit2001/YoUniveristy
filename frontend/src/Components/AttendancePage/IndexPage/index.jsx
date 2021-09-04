import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

import { LoginContext } from "../../../global/LoginContext";

const Attendance = () => {
  const { isTeacherAuth, setIsTeacherAuth, teacherID, pwd } =
    useContext(LoginContext);

  if (teacherID && pwd) {
    setIsTeacherAuth(true);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>WHO ARE YOU?</h2>
      <Link to="/attendanceStudentSemester">
        <button type="button" className={styles.btn}>
          I'm a student
        </button>
        <div className="container-fluid"></div>
      </Link>
      <br />
      <br />
      <Link to={isTeacherAuth ? "/teacherWelcome" : "/login/teacher"}>
        <button type="button" className={styles.btn}>
          I'm a teacher
        </button>
        <br />
        <br />
      </Link>
    </div>
  );
};

export default Attendance;