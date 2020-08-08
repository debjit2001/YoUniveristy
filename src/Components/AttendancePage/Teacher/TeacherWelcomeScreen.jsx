import React, { useState } from "react";
import styles from "./welcomeScreen.module.css";
import { Link } from "react-router-dom";

const Teacher = () => {
  const [stream, setStream] = useState("");
  const [semester, setSemester] = useState(null);
  const [sub, getSub] = useState("");
  const streams = ["CSE", "ECE", "EE", "ME", "CSBS", "EEE"];
  const sem = [1, 3, 5, 7];
  const subjects = ["ORGANISATION(CS-301)", "DS(303)"];
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
    display: sub ? "" : "none",
    outline: "none",
    border: "none",
  };

  const logOutHandler = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const getStream = (e) => {
    setStream(e.target.innerHTML);
  };

  const getSemester = (sem) => {
    setSemester(sem);
    console.log(semester);
  };

  return (
    <div class={styles.welcome} style={{ margin: 10 }}>
      <header>
        {" "}
        <img
          src="/assets/icons/exit-30.png"
          alt="logout"
          className="float-right"
          style={{ cursor: "pointer" }}
          onClick={logOutHandler}
        />
        <span className="float-right">
          <img src="/assets/icons/user-25.png" alt="user-icon" />{" "}
          {window.localStorage.getItem("username")}
        </span>
      </header>
      <div className={styles.container}>
        <h2 className={styles.heading}>Stream</h2>
        <div className={styles.dropdown}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {stream ? stream : "Select Stream"}
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenu2"
            style={{ background: "#f2f2f2" }}
          >
            {streams.map((str, index) => (
              <button
                className="dropdown-item"
                type="button"
                style={index % 2 === 0 ? buttonStyleEven : buttonStyleOdd}
                onClick={(e) => getStream(e)}
                key={index}
              >
                {str}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: stream ? "block" : "none" }}>
          {" "}
          <h2 className={styles.heading}>SEMESTER</h2>
          {sem.map((s, index) => (
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={() => getSemester(s)}
              key={index}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: semester ? "block" : "none" }}>
          {" "}
          <h2 className={styles.heading}>PAPER NAME(CODE)</h2>
          {subjects.map((SUB, index) => (
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              style={index % 2 === 0 ? buttonStyleEven : buttonStyleOdd}
              onClick={() => getSub(SUB)}
            >
              {SUB}
            </button>
          ))}
        </div>
        <Link to="/attendanceDetails">
          <button style={buttonStyleNext}>
            <img src="/assets/icons/next-page-64.png" alt="continue" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Teacher;
