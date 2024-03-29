import React, { useState } from "react";
import styles from "./IndexPage/styles.module.css";
import { Link } from "react-router-dom";

export const StudentSemester = () => {
  const [stream, setStream] = useState("CSE");
  const [semester, setSemester] = useState(null);

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
  const getStream = (e) => {
    setStream(e.target.innerHTML);
  };

  const getSemester = (sem) => {
    setSemester(sem);
    console.log(semester);
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
            <button
              className="dropdown-item"
              type="button"
              style={buttonStyleEven}
            >
              CSE
            </button>

            <button
              className="dropdown-item"
              type="button"
              style={buttonStyleOdd}
              onClick={(e) => getStream(e)}
            >
              ECE
            </button>
            <button
              className="dropdown-item"
              type="button"
              style={buttonStyleEven}
              onClick={(e) => getStream(e)}
            >
              EE
            </button>
            <button
              className="dropdown-item"
              type="button"
              style={buttonStyleOdd}
              onClick={(e) => getStream(e)}
            >
              ME
            </button>
            <button
              className="dropdown-item"
              type="button"
              style={buttonStyleEven}
              onClick={(e) => getStream(e)}
            >
              EEE
            </button>
            <button
              className="dropdown-item"
              type="button"
              style={buttonStyleOdd}
              onClick={(e) => getStream(e)}
            >
              CSBS
            </button>
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

export default StudentSemester;
