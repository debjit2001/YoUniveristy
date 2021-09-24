import React,{useState} from 'react';
import styles from './signup.module.css';
import registerSvg from './register.png';
import {validateConfirmPassword, validateEmail, validateName, validatePassword, validateRoll, validateSemester, validateStream} from '../Validators/validate';
import {Link} from 'react-router-dom';
const Signup=()=>{

  //Creating states
  const [studentData,setStudentData]=useState(
    {studentName:'',roll:'',stream:'',semester:'',email:'',password:'',confirmpassword:''});
 
  var error=false;
  //Handling Inputs
  let name,value;
  const handleInputs=(e)=>{
    e.preventDefault();
    name=e.target.name;
    value=e.target.value;
    var nameField=document.querySelector(`#${name} input`);
    var errorMessage=document.querySelector(`#${name} .errorMessage`);
    var warningIcon=document.querySelector(`#${name} .fa-exclamation-circle`);
    var correctIcon=document.querySelector(`#${name} .fa-check-circle`);
    error=false;
    var setErrorMessage="";
    var isValid;
    setStudentData({...studentData,[name]:value});
    if(name==="studentName"){
      isValid=validateName(value);
      
    }
    else if(name==="roll"){
     
      isValid=validateRoll(value);
    }
    else if(name==="stream"){
      
      isValid=validateStream(value);
    }
    else if(name==="semester"){
      
      isValid=validateSemester(value);
      // console.log(value);
    }
    else if(name==="email"){
    
      isValid=validateEmail(value);
    }
    else if(name==="password"){
      isValid=validatePassword(value);
    }
    else{
      
      isValid=validateConfirmPassword(value,studentData.password);
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

  //Sliding the figure div towards right
  const rightmove=()=>{
    var errorCheck=document.getElementsByClassName("errorCheck")[0];
    if(studentData.studentName===''||studentData.roll===''||studentData.stream===''||studentData.semester===''){
      var fields=["studentName","roll","stream","semester"];
      for(var i=0;i<fields.length;i++){
        var nameField=document.querySelector(`#${fields[i]} input`);
        var errorMessage=document.querySelector(`#${fields[i]} .errorMessage`);
        nameField.style.borderBottom="2px solid red";
        errorMessage.innerHTML=`${fields[i].charAt(0).toUpperCase()+fields[i].substring(1)} field is empty`;
      }
        errorCheck.innerHTML="Kindly fill all the fields"
    }
    else if(!validateName(studentData.studentName)[0]||!validateRoll(studentData.roll)[0]||!validateStream(studentData.stream)||!validateSemester(studentData.semester)){
      errorCheck.innerHTML="Kindly resolve errors first"
    }
    else{
      errorCheck.innerHTML="";
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
   <div className={`${styles.form_name}`} id="studentName">
   <div className={`${styles.col}`} id="studentName">
     <input type="text" className={`${styles.form_control}`}
   value={studentData.studentName}
   onChange={handleInputs}
     placeholder="Enter your name" name="studentName" autoComplete="off" required/>
     <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div> 
   <div className="errorMessage" ></div>
   </div>
 </div>
 <div className={`${styles.form_row}`}>
 <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   <div className={`${styles.form_name}`} id="roll">
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={studentData.roll}
   onChange={handleInputs}
     placeholder="Enter your Roll Number " name="roll" autoComplete="off" required/>
       <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
     
   </div>
   <div className="errorMessage" ></div>  
   </div>
 </div>
 <div className={`${styles.form_row}`}>
     <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
      <div className={`${styles.form_name}`} id="stream">
     <div className={`${styles.col}`} >
     <input type="text" className={`${styles.form_control}`}
   value={studentData.stream}
   onChange={handleInputs}
     placeholder="Enter your Stream" name="stream" autoComplete="off" required/>
       <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div>  
   <div className="errorMessage" ></div>
   </div>
 </div>
 <div className={`${styles.form_row}`}>
     <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
      <div className={`${styles.form_name}`} id="semester">
     <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={studentData.semester}
   onChange={handleInputs}
     placeholder="Enter your Semester" min="1" max="8" name="semester" autoComplete="off" required/>
       <i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>
     <i class="fas fa-check-circle" style={{color:"#005f00"}}></i>
   </div>  
   <div className="errorMessage" ></div>
  </div>
 </div>
 <div className={`${styles.move_right}`}>
 <div className="btn btn-danger" id="nextMove" style={{width:"23%",fontSize:"21%"}} onClick={()=>rightmove()}>
     Next
   </div>
  <div className="errorCheck"></div>
   </div>
 </div>
 <div id="firp" class="lop">
 <div className={`${styles.form_row}`}>
 <i class={`fas fa-envelope ${styles.fa_envelope}`}></i>
   <div className={`${styles.form_name}`} id="email">
   <div className={`${styles.col}`} >
     <input type="email" className={`${styles.form_control}`}
   value={studentData.email}
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
 <div className={`${styles.col}`} >
     <input type="password" className={`${styles.form_control}`} 
  value={studentData.password}
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
 <div className={`${styles.col}`} >
     <input type="password" className={`${styles.form_control}`} 
   value={studentData.confirmpassword}
   name="confirmpassword"
   onChange={handleInputs}
   pattern="[A-Za-Z0-9]{7,}"
   title="Password must start with a captital "
     placeholder="Confirm your password" required/>
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
   <Link style={{    marginLeft: "14px",cursor: "pointer",color: "rgb(6 31 132)"}} to="/signin">
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