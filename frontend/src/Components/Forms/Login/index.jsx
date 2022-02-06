import React, { useState } from "react";
//import { changePasswordView } from "../../../helperMethods";
import styles from "./style.module.css";

const LoginForm = ({ emailError, passwordError, loginFormSubmitHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const errorPlaceHolderStyle = {
    color: "red",
  };
  const errorInputStyle = {
    borderBottom: "2px solid red",
    color: "red",
  };

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const enteredEmail = value.trimLeft();
      if (enteredEmail) {
        enteredEmail.length
          ? setEmail(enteredEmail)
          : setEmail("");
      } else {
        setEmail("");
      }
    } else {
      setPassword(value.trim());
    }
  };

  //formDataHandler() method for sending form data from LoginForm.jsx to Auth.jsx
  const formDataHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    loginFormSubmitHandler(formData);
  };

  //password view change handler
  const changePasswordView = (isHidden, setIsHidden) => {
    const currentViewState = isHidden;
    setIsHidden(!currentViewState);
  };
  return (
    <div className={styles.LoginFormContainer}>
      <form className={styles.LoginForm} onSubmit={(e) => formDataHandler(e)}>
        <div className={styles.inputSection}>
          <div className={styles.inputDiv}>
            <span
              className={
                email || email.length || emailFocus
                  ? styles.smallEmailPlaceholderText
                  : styles.emailPlaceholderText
              }
              style={emailError ? errorPlaceHolderStyle : null}
              onClick={() => setEmailFocus(true)}
            >
              <p> Email</p>
            </span>
            <input
              type="email"
              className={styles.EmailInput}
              name="email"
              value={email}
              placeholder={emailFocus ? "Enter your Email" : ""}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => {
                setEmailFocus(true);
              }}
              onBlur={() => {
                setEmailFocus(false);
              }}
              required
              style={emailError ? errorInputStyle : null}
            />
          </div>
          <div className={styles.inputDiv}>
            <span
              className={
                passwordFocus || password.length
                  ? styles.smallPasswordPlaceholderText
                  : styles.passwordPlaceholderText
              }
              style={passwordError ? errorPlaceHolderStyle : null}
              onClick={() => setPasswordFocus(true)}
            >
              <p> Password</p>
            </span>
            <input
              type={isHidden ? "password" : "text"}
              className={styles.PasswordInput}
              id="inputPassword3"
              value={password}
              name="password"
              placeholder={passwordFocus ? "Enter Password" : ""}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
              style={passwordError ? errorInputStyle : null}
            />
            {password.length ? (
              <img
                src={
                  isHidden
                    ? "/assets/images/icons/LoginForm/eye.svg"
                    : "/assets/images/icons/LoginForm/visibility_off_black_24dp.svg"
                }
                alt="show-password"
                className={styles.showHidePassword}
                onClick={() => changePasswordView(isHidden, setIsHidden)}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.SignInButtonContainer}>
          <button type="submit" className="btn btn-success">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
