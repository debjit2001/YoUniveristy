import React, { useState, useContext } from "react";
import styles from "./styles.module.css";
// import { useHistory } from "react-router";
import { LoginContext } from "../../../../global/LoginContext";
// import axios from "axios";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setIsTeacherAuth } = useContext(LoginContext);
  // const history = useHistory();

  const _onSubmitHandler = (e) => {
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
    const { name, value } = e.target;
    name === "username" ? setUserName(value) : setPassword(value);
  };

  return (
    <div>
      <div className={styles.h3Container}>
        <h3>Log In</h3>
      </div>
      <form onSubmit={_onSubmitHandler}>
        <div className={styles.formContainer}>
          <div className={styles.formControl}>
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              name="username"
              id="username"
              value={username}
              className={styles.userName}
              type="text"
              placeholder=" Teacher ID"
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
          <div className={styles.resetPassword}>
            <a href="/">
              <span>Forget Password?</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
