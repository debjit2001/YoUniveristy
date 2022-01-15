import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

import { LoginContext } from "../../../global/LoginContext";
import AttendanceCharacterCard from "../../AttendanceCharacterCard";
import LinkButton from "../../LinkButton";

const Attendance = () => {
  const { isTeacherAuth, setIsTeacherAuth, teacherID, pwd } =
    useContext(LoginContext);

  if (teacherID && pwd) {
    setIsTeacherAuth(true);
  }

  return (
    <div className={`${styles.outer_container}`}>
      <div className={`${styles.login_register}`}>
        {/* <Link className={`${styles.button}`} to="/signin">
          Login
        </Link>
        <Link className={`${styles.button}`} to="/signup">
          Register
        </Link> */}
        <LinkButton targetUrl="signin" buttonText="Login" />
        <LinkButton targetUrl="signup" buttonText="Register" />
      </div>
      <div className={styles.container}>
        <h2 className={styles.heading}>WHO ARE YOU?</h2>
        <AttendanceCharacterCard
          targetUrl="attendanceStudentSemester"
          buttonText="I'm a student"
        />
        <br />
        <br />
        <AttendanceCharacterCard
          targetUrl={isTeacherAuth ? "/teacherWelcome" : "/login/teacher"}
          buttonText="I'm a teacher"
        />
      </div>
    </div>
  );
};

export default Attendance;
