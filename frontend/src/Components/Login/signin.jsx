/*
  This is a Login Page
  Here we check whether a particular user is authenticate or not
*/
import React,{useState} from 'react';

//CSS of Login Page
import styles from './login.module.css';


import loginSvg from './login.png';
import {Link} from "react-router-dom";




const Login=()=>{

 
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
 
  

  return(
    <>
   
     <div className={`${styles.container_login}`}>
       <div className={`${styles.form_outer}`}>
      <div className={`${styles.form_inner}`}>
        <p className={`${styles.reg}`}>Login</p>
        <div className={`${styles.formpng}`}>
        <div className={`${styles.form_inner_inner}`}>
    <form action="login" method="POST"> 
  <div className={`${styles.form_row}`}>
      <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
    
    <div className={`${styles.col}`}>
      <input type="email" className={`${styles.form_control}`}
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      placeholder="Enter your email" name="email"/>
    </div> 
  </div>
    <div className={`${styles.form_row}`}>
        <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
  <div className={`${styles.col}`}>
      <input type="password" className={`${styles.form_control}`} 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="Enter your password" name="password"/>
    </div>
    </div>
    <div className={`${styles.forget_password}`}>

<Link to="/">Forget Password ?</Link> 
</div>
  <div className={`${styles.form_check}`}>
    <input type="checkbox" className={`${styles.form_check_input}`} id="exampleCheck1"/>
    <label className={`${styles.form_check_label}`} htmlFor="exampleCheck1">Remember Me</label>
  </div>
  <div className={`${styles.btner}`}>
  <button type="submit" className={`btn btn-danger ${styles.login}`}
  
  >LogIn
  </button>
 <div className={`${styles.no_account}`}>
   Don't have an account ?
   <Link style={{    marginLeft: "14px",cursor: "pointer",color: "#1c3958",fontWeight: "bold"}} to="/signup">
    Register
    </Link>
 </div>
 </div>
 
  </form>
  </div>
  <div className={`${styles.form_inner_inner}`}>
    <img className={`${styles.login_png}`} src={loginSvg} alt="login_photo"/>
    </div>
    </div>
  </div>
  </div>
  </div>
    </>
  )
}
export default Login;