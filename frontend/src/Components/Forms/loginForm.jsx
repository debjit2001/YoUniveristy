import React, { useState, useContext } from "react";
import styles from "../Forms/loginform.module.css";
import { useHistory } from "react-router";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";
// import firebase from "../../firebase/config/config";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPwd] = useState("");

  const { setIsTeacherAuth } = useContext(LoginContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsTeacherAuth(true);
    // axios
    //   .post("http://localhost:8000/api/login/", { username, password })
    //   .then((res) => {
    //     window.localStorage.setItem("username", username);
    //     window.localStorage.setItem("pwd", password);
    //     setIsTeacherAuth(true);
    //     history.push("/teacherWelcome");
    //   })
    //   .catch((err) => console.log(err));
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
    } else {
      setPwd(e.target.value);
    }
  };

  return (
    <>
      <div className={styles.h3Container}>
        <h3>Log In</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.formContainer}>
          <div className={styles.formControl}>
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              name="username"
              id="username"
              value={username}
              className={styles.userName}
              type="text"
              placeholder=" TeacherId"
              autoFocus
              required
              onChange={(e) => onChangeHandler(e)}
            />
            <hr /> <br />
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              name="password"
              id="password"
              value={password}
              className={styles.pwd}
              type="password"
              placeholder="enter your password"
              autoComplete="off"
              required
              onChange={(e) => onChangeHandler(e)}
            />
            <hr />
            <br />
            <button type="submit" className={styles.submitBtn}>
              Log in
            </button>
          </div>
          <div className={styles.socialMediaLogin}>
            <div className={styles.socialMediaIcon}>
              <a href="/">
                <img src="/assets/icons/Google+.svg" alt="Google-logo" />
              </a>{" "}
            </div>
            <div className={styles.socialMediaIcon}>
              <a href="/">
                <img src="/assets/icons/Facebook.svg" alt="facebook-logo" />
              </a>
            </div>
          </div>

          <div className={styles.resetPassword}>
            <a href="/">
              <span>Forget Password?</span>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
export default Login;
