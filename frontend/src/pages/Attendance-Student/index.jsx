//3rd party imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AttendanceStudentSemester from "../../Components/AttendanceStudentSemester";
//stylesheet import
import styles from "./style.module.css";


export const AttendanceStudent = () => {
//State declarations
  const [stream, setStream] = useState("CSE");
  const [semester, setSemester] = useState(null);
  //Array of available streams declared
  const streamsArray=["CSE","ECE","EE","ME","EEE","CSBS"];

  //local style declaration
  const buttonStyleOdd = {
    backgroundColor: "#9ddcdc",
    borderRadius: "5rem",
    fontWeight: "bolder",
    border: "none",
  };
  const buttonStyleEven = {
    backgroundColor: " hsl(205, 86%, 17%)",
    borderRadius: "5rem",
    fontWeight: "bolder",
    color: "#c59d5f",
    border: "none",
  };

  let buttonStyleNext = {
    display: semester ? "" : "none",
    outline: "none",
    border: "none",
  };
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
                <AttendanceStudentSemester buttonStyle={index%2===0?"buttonStyleEven":"buttonStyleOdd"} clickHandler={(newStream)=>getStream(newStream)} buttonText={currentStream} key={index}/>
              ))
            }
            
          </div>
        </div>

        <h2 className={styles.heading}>SEMESTER</h2>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          style={buttonStyleOdd}
          onClick={() => getSemester(1)}
        >
          1st
        </button>

        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          style={buttonStyleEven}
          onClick={() => getSemester(3)}
        >
          3rd
        </button>

        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          style={buttonStyleOdd}
          onClick={() => getSemester(5)}
        >
          5th
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          style={buttonStyleEven}
          onClick={() => getSemester(7)}
        >
          7th
        </button>
        <Link to="/attendanceDetails">
          <button style={buttonStyleNext}>
            <img src="/assets/icons/next-page-64.png" alt="continue" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default AttendanceStudent;
