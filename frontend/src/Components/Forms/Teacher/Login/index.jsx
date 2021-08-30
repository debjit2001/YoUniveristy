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
    <div className={styles.container}>
      <div className={styles.heading}>Welcome! Login</div>
      <form onSubmit={_onSubmitHandler} className={styles.loginForm}>
        <div className={styles.formContent}>
          <div className={styles.inputSection}>
            <div className={styles.inputDiv}>
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                name="username"
                id="username"
                value={username}
                type="text"
                placeholder=" Teacher ID"
                autoFocus
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className={styles.inputDiv}>
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                name="password"
                id="password"
                value={password}
                type="password"
                placeholder="enter your password"
                autoComplete="off"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Log in
          </button>
        </div>
      </form>
      <div className={styles.resetPassword}>
        <a href="/">
          <span>Forget Password?</span>
        </a>
      </div>
    </div>
  );
};
export default Login;
