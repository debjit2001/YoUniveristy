//Thid party import
import React, { useContext } from "react";
//stylesheet import
import styles from "./style.module.css";
//local import
import AttendanceCharacterCard from "../../Components/AttendanceCharacterCard";
import LinkButton from "../../Components/LinkButton";
import { LoginContext } from "../../global/LoginContext";
import AvatarCard from "Components/AvatarCard";

const AttendanceIndex = () => {
  /**
   * fetching context values
   */
  const { isTeacherAuth, setIsTeacherAuth, teacherID, pwd } =
    useContext(LoginContext);

  // if (teacherID && pwd) {
  //   console.log("from pwd check-->");
  //   setIsTeacherAuth((prev) => (prev = true));
  // }

  return (
    <div>
      <div className={styles.login_register}>
        <LinkButton targetUrl="signin" buttonText="Login" />
        <LinkButton targetUrl="signup" buttonText="Register" />
      </div>
      <div className={styles.container}>
        <AvatarCard userRole="student" />
        <AvatarCard userRole="teacher" />
      </div>
    </div>
  );
};

export default AttendanceIndex;
