/*
  This is a Login Page
  Here we check whether a particular user is authenticate or not
*/
import React, { useState } from "react";

//CSS of Login Page
import styles from "./login.module.css";

import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../Validators/validate";

const Login = () => {
  const [studentLogin,setStudentLogin]=useState({email:'',password:''})
  var name,value;
  var error=false;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    var nameField=document.querySelector(`#${name} input`);
    var errorMessage=document.querySelector(`#${name} .errorMessage`);
    var warningIcon=document.querySelector(`#${name} .fa-exclamation-circle`);
    var correctIcon=document.querySelector(`#${name} .fa-check-circle`);
    error=false;
    var setErrorMessage="";
    var isValid;
    setStudentLogin({...studentLogin,[name]:value});
    if(name==="email"){
      isValid=validateEmail(value);
    }
    else if(name==="password"){
      isValid=validatePassword(value);
    }
    if(isValid[0]===false){
      error=true;
     setErrorMessage=isValid[1];
    }
    console.log(isValid);
    warningIcon.style.display="none";
    correctIcon.style.display="none";
  
    if(value.length===0){
      nameField.style.borderBottom="2px solid black";
      errorMessage.innerHTML="";
    }
    else if(error===true&&setErrorMessage.length>0){
      nameField.style.borderBottom="2px solid red";
      warningIcon.style.display="block";
      errorMessage.innerHTML=setErrorMessage;
    
    }
    else{
      nameField.style.borderBottom="2px solid green";
      correctIcon.style.display="block";
      errorMessage.innerHTML="";
    }
   
  
  }
  return (
      <div className={`${styles.container_login}`}>
        <div className={`${styles.form_outer}`}>
          <div className={`${styles.form_inner}`}>
            <p className={`${styles.reg}`}>Login</p>
            <div className={`${styles.formpng}`}>
              <div className={`${styles.inputSection}`}>
                <form action="login" method="POST">
                  
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-user ${styles.fa_user}`}
                      aria-hidden="true"
                    ></i>
                      <div className={`${styles.form_name}`} id="email">
                    <div className={`${styles.col}`}>
                      <input
                        type="email"
                        className={`${styles.form_control}`}
                        value={studentLogin.email}
                        onChange={handleInputs}
                        placeholder="Enter your email"
                        name="email"
                      />
                       <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
                      <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
                    </div>
                    <div className="errorMessage" ></div>  
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-lock ${styles.fa_lock}`}
                      aria-hidden="true"
                    ></i>
                      <div className={`${styles.form_name}`} id="password">
                    <div className={`${styles.col}`}>
                      <input
                        type="password"
                        className={`${styles.form_control}`}
                        value={studentLogin.password}
                        onChange={handleInputs}
                        placeholder="Enter your password"
                        name="password"
                      />
                       <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
                       <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
                    </div>
                    <div className="errorMessage" ></div>  
                    </div>
                  </div>
                  {/* <div className={`${styles.forget_password}`}>

                    <Link to="/">Forget Password ?</Link>
                  </div> */}
                  <div className={`${styles.btner}`}>
                    <button
                      type="submit"
                      className={`btn btn-success ${styles.login}`}
                    >
                      Login
                    </button>
                    <div className={`${styles.no_account}`}>
                      Don't have an account?
                      <Link
                        style={{
                          marginLeft: "4px",
                          cursor: "pointer",
                          color: "rgb(21,18,240)",
                          fontWeight: "bold",
                        }}
                        to="/signup"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className={`${styles.form_inner_inner}`}>
                <img
                  className={`${styles.login_png}`}
                  src="assets/img/login.svg"
                  alt="login_photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default Login;
