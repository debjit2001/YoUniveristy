import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MailOutline } from "react-ionicons";

import styles from "./style.module.css";

import {
  validateEmail,
  validatePassword,
  validateRegistrationNumber,
} from "../../Validators/validate";

const Login = () => {
  const [teacherLogin, setTeacherLogin] = useState({
    registrationNumber: "",
    email: "",
    password: "",
  });
  let name, value;
  var error = false;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    var nameField = document.querySelector(`#${name} input`);
    var errorMessage = document.querySelector(`#${name} .errorMessage`);
    var warningIcon = document.querySelector(`#${name} .fa-exclamation-circle`);
    var correctIcon = document.querySelector(`#${name} .fa-check-circle`);
    error = false;
    var setErrorMessage = "";
    var isValid;
    setTeacherLogin({ ...teacherLogin, [name]: value });
    if (name === "registrationNumber") {
      isValid = validateRegistrationNumber(value);
    } else if (name === "email") {
      isValid = validateEmail(value);
    } else {
      isValid = validatePassword(value);
    }
    if (isValid[0] === false) {
      error = true;
      setErrorMessage = isValid[1];
    }
    console.log(isValid);
    // warningIcon.style.display = "none";
    // correctIcon.style.display = "none";

    if (value.length === 0) {
      nameField.style.borderBottom = "2px solid black";
      errorMessage.innerHTML = "";
    } else if (error === true && setErrorMessage.length > 0) {
      nameField.style.borderBottom = "2px solid red";
      warningIcon.style.display = "block";
      errorMessage.innerHTML = setErrorMessage;
    } else {
      nameField.style.borderBottom = "2px solid green";
      correctIcon.style.display = "block";
      errorMessage.innerHTML = "";
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.header}>Login</p>
          <div className={styles.formBody}>
            <div className={styles.form_row}>
              <i
                className={`fa fa-user ${styles.fa_user}`}
                aria-hidden="true"
              ></i>
              <div className={styles.col}>
                <input
                  type="email"
                  className={styles.form_control}
                  value={teacherLogin.registrationNumber}
                  onChange={handleInputs}
                  placeholder="Enter your Registration Number"
                  name="registrationNumber"
                />
                <i
                  className="fas fa-exclamation-circle"
                  style={{ color: "#f60000" }}
                ></i>
                <i
                  className="fas fa-check-circle"
                  style={{ color: "#005f00" }}
                ></i>
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.form_name} id="email">
                <i className={`fa fa-envelope ${styles.fa_user}`}></i>
                <input
                  type="email"
                  className={styles.form_control}
                  value={teacherLogin.email}
                  onChange={handleInputs}
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
            </div>
            <div className={`${styles.form_row} ${styles.passwordInput}`}>
              <i
                className={`fa fa-lock ${styles.fa_lock}`}
                aria-hidden="true"
              ></i>
              <div className={styles.form_name} id="password">
                <div className={styles.col}>
                  <input
                    type="password"
                    className={styles.form_control}
                    value={teacherLogin.password}
                    onChange={handleInputs}
                    placeholder="Enter your password"
                    name="password"
                  />
                  <i
                    className="fas fa-exclamation-circle"
                    style={{ color: "#f60000" }}
                  ></i>
                  <i
                    className="fas fa-check-circle"
                    style={{ color: "#005f00" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className={styles.btner}>
              <button
                type="submit"
                className={`btn btn-danger ${styles.loginButton}`}
              >
                Log In
              </button>
              <div className={styles.no_account}>
                Don't have an account ?
                <Link
                  style={{
                    marginLeft: "14px",
                    cursor: "pointer",
                    color: "#1c3958",
                    fontWeight: "bold",
                  }}
                  to="/register/teacher"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
