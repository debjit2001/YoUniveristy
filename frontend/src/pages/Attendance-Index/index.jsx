//Thid party import
import React from "react";
//stylesheet import
import styles from "./style.module.css";
//local import
import AvatarCard from "Components/AvatarCard";

const AttendanceIndex = () => {
  /**
   * fetching context values
   */
  // const { isTeacherAuth, setIsTeacherAuth, teacherID, pwd } =
  //   useContext(LoginContext);

  // if (teacherID && pwd) {
  //   console.log("from pwd check-->");
  //   setIsTeacherAuth((prev) => (prev = true));
  // }

  return (
    <div className={styles.outer_container}>
      {/* <div className={styles.login_register}>
        <LinkButton targetUrl="signin" buttonText="Login" />
        <LinkButton targetUrl="signup" buttonText="Register" />
      </div> */}
      <div className={styles.container}>
        <AvatarCard userRole="student" />
        <AvatarCard userRole="teacher" />
      </div>
    </div>
  );
};

export default AttendanceIndex;
