//Third party imports
import AttendanceStudentSemester from "Components/AttendanceStudentSemester";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AttendanceStudentStream from "../../Components/AttendanceStudentStream"
//stylesheet import
import styles from "./style.module.css";

export const AttendanceStudent = () => {
//State declarations
  const [stream, setStream] = useState("CSE");
  const [semester, setSemester] = useState(null);
  //Array of available streams declared
  const streamsArray=["CSE","ECE","EE","ME","EEE","CSBS"];
  // Array of available semesters declared
  const semesterArray=["1st","3rd","5th","7th"];
  //Method declarations
  /**
   * @desc set stream state
   * @param {*} selectedStream 
   */
  const getStream = (selectedStream) => {
    setStream((prev)=>(prev=selectedStream));
  };
  /**
   * @desc set semester state 
   * @param {*} sem 
   */ 
  const getSemester = (sem) => {
    setSemester((prev)=>(prev=sem));
  };
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>Stream</h2>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {stream}
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenu2"
            style={{ background: "#f2f2f2" }}
          >
            {
              streamsArray.map((currentStream,index)=>(
                <AttendanceStudentStream buttonStyle={index%2===0?"buttonStyleEven":"buttonStyleOdd"} clickHandler={(newStream)=>getStream(newStream)} buttonText={currentStream} key={index}/>
              ))
            } 
          </div>
        </div>
        <h2 className={styles.heading}>SEMESTER</h2>
        {
          semesterArray.map((currentSemester,index)=>(
            <AttendanceStudentSemester buttonStyle={index%2===0?"buttonStyleEven":"buttonStyleOdd"} buttonText={currentSemester} clickHandler={(selectedSemester)=>getSemester(selectedSemester)} key={index}/>
          ))
        }
        <Link to="/attendanceDetails">
          <button className={`${styles.nextButton} ${!semester && styles.nextButtonHidden}`}>
            <img src="/assets/icons/next-page-64.png" alt="continue" />
          </button>
        </Link>
      </div>
    </>
  );
};
export default AttendanceStudent;
