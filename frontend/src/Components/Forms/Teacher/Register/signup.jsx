import React,{useState} from 'react';
import styles from './signup.module.css';
import registerSvg from './register.png';

import {Link} from 'react-router-dom';
import { validateConfirmPassword, validateEmail, validatePassword, validateRegistrationNumber, validateUsername } from '../../../Validators/validate';
const Signup=()=>{
 
  //Created states
  const [user,setUser]=useState({
    registration_id:'',username:'',email:'',password:'',confirmpassword:''
  });
  
 //Handling Inputs
  let name,value;
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
    setUser({...user,[name]:value});
    if(name==="registration_id"){
      isValid=validateRegistrationNumber(value);
    }
    else if(name==="username"){
      isValid=validateUsername(value);
    }
    else if(name==="email"){
      isValid=validateEmail(value);
    }
    else if(name==="password"){
      isValid=validatePassword(value);
    }
    else{
      isValid=validateConfirmPassword(value,user.password);
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
  };

  //Sliding the figure div to the right side
  const rightmove=()=>{
    var errorCheck=document.getElementsByClassName("errorCheck")[0];
    if(user.registration_id===''||user.username===''){
      var fields=["registration_id","username"];
      for(var i=0;i<fields.length;i++){
        var nameField=document.querySelector(`#${fields[i]} input`);
        var errorMessage=document.querySelector(`#${fields[i]} .errorMessage`);
        nameField.style.borderBottom="2px solid red";
        errorMessage.innerHTML=`${fields[i].charAt(0).toUpperCase()+fields[i].substring(1)} field is empty`;
      }
        errorCheck.innerHTML="Kindly fill all the fields"
    }
    else if(!validateRegistrationNumber(user.registration_id)[0]||!validateUsername(user.username[0])){
      errorCheck.innerHTML="Kindly resolve errors first"
    }
    else{
    let nextMove=document.getElementById("fig")
      nextMove.style.left=`${-100}%` ;
    }
  }
    return(
      <>
     
      <div className={`${styles.container_signup}`}>
      <div className={`${styles.form_outer}`}>
     <div className={`${styles.form_inner}`}>
       <p className={`${styles.reg}`}>Register</p>
       <div className={`${styles.formpng}`}>
       <div className={`${styles.form_inner_inner}`}>
   <form action="login" method="POST" > 
   <div className={`${styles.slide}`}>
        <figure className={`${styles.fig}`} id="fig">
            <div id="firp" className={`${styles.lop}`}>
   <div className={`${styles.form_row}`}>
  
   <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   <div className={`${styles.form_name}`} id="registration_id">
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.registration_id}
   onChange={handleInputs}
     placeholder="Enter your registration id" name="registration_id" autoComplete="off" required/>
    <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div> 
   <div className="errorMessage" ></div>
   </div>
 </div>
 <div className={`${styles.form_row}`}>

 <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
 <div className={`${styles.form_name}`} id="username">
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.username}
   onChange={handleInputs}
     placeholder="Enter your username " name="username" autoComplete="off" required/>
    <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div> 
   <div className="errorMessage" ></div>
 </div>
 </div>
 
 <div className={`${styles.move_right}`}>
 <div className="btn btn-danger" id="nextMove" style={{width:"23%"}} onClick={()=>rightmove()}>
     Next
    
   </div>
   <div className="errorCheck"></div>
   </div>
 </div>
 <div id="firp" class="lop">
 <div className={`${styles.form_row}`}>

 <i class="fas fa-envelope"></i>
 <div className={`${styles.form_name}`} id="email">
   <div className={`${styles.col}`}>
     <input type="email" className={`${styles.form_control}`}
   value={user.email}
   onChange={handleInputs}
     placeholder="Enter your email" name="email" autoComplete="off"/>
   <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div> 
   <div className="errorMessage" ></div>
   </div>
 </div>
   <div className={`${styles.form_row}`}>
  
       <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
       <div className={`${styles.form_name}`} id="password">
 <div className={`${styles.col}`}>
     <input type="password" className={`${styles.form_control}`} 
  value={user.password}
  pattern='[A-Za-Z0-9]{7,}'
  title="Password must start with a captital "
  name="password"
  onChange={handleInputs}
     placeholder="Enter your password" required/>
   <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div> 
   <div className="errorMessage" ></div>
   </div>
   </div>
   <div className={`${styles.form_row}`}>
  
   <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
   <div className={`${styles.form_name}`} id="confirmpassword">
 <div className={`${styles.col}`}>
     <input type="password" className={`${styles.form_control}`} 
   value={user.confirmpassword}
   name="confirmpassword"
   onChange={handleInputs}
   pattern="[A-Za-Z0-9]{7,}"
   title="Password must start with a captital "
     placeholder="Confirm your password"  required/>
   <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div> 
   <div className="errorMessage" ></div>
      </div>
   </div>
 <div className={`${styles.btner}`}>
 <input type="submit" className={`btn btn-danger ${styles.login}`}
  
  value="Register"
 />
</div>
</div>
</figure>
 </div>
 </form>
 <div className={`${styles.has_account}`}>
   Already have an account ?
   <Link style={{    marginLeft: "14px",cursor: "pointer",color: "rgb(6 31 132)"}} to="/login/teacher">
    Signin
    </Link>
 </div>
 </div>
 <div className={`${styles.form_inner_inner}`}>
 <img className={`${styles.login_png}`} src={registerSvg} alt="login_photo"/>
 
  
   </div>
   
   </div>
 </div>
 </div>
 </div>
    </>
      )
}
export default Signup;