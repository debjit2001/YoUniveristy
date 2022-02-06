//Third party imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
//stylesheet import
import styles from "./style.module.css";
//Local import
import SelectionOption from "Components/SelectionOption";
import { useEffect } from "react";
import ImageWrapper from "Components/Image-Wrapper";

export const AttendanceStudent = () => {
  //State declarations
  const [stream, setStream] = useState("CSE");
  const [semester, setSemester] = useState(null);
  //Array of available streams
  const availableStreams = ["CSE", "ECE", "EE", "ME", "EEE", "CSBS"];
  // Array of available semesters
  const availableSemester = ["1st", "3rd", "5th", "7th"];
  //useEffect
  useEffect(() => {
    if (semester) {
      getSemester(null);
    }
  }, [stream]);
  //Method declarations
  /**
   * @desc set stream state
   * @param {*} selectedStream
   */
  const getStream = (selectedStream) => {
    setStream((prev) => (prev = selectedStream));
  };
  /**
   * @desc set semester state
   * @param {*} sem
   */
  const getSemester = (sem) => {
    setSemester((prev) => (prev = sem));
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>Stream</h2>
        <div className="dropdown btn-group">
        <button type="button" class="btn btn-primary">
        {stream}
        </button>
          <button
            className="btn btn-primary dropdown-toggle dropdown-toggle-split"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenu2"
            style={{ background: "#f2f2f2" }}
          >
            {availableStreams.map((currentStream, index) => (
              <SelectionOption
                baseClass="dropdown-item"
                buttonStyle={
                  index % 2 === 0 ? "buttonStyleEven" : "buttonStyleOdd"
                }
                clickHandler={(newStream) => getStream(newStream)}
                buttonText={currentStream}
                key={index}
              />
            ))}
          </div>
        </div>
        <h2 className={styles.heading}>SEMESTER</h2>
        {availableSemester.map((currentSemester, index) => (
          <SelectionOption
            baseClass="btn btn-primary btn-lg btn-block"
            buttonStyle={index % 2 === 0 ? "buttonStyleEven" : "buttonStyleOdd"}
            buttonText={currentSemester}
            clickHandler={(selectedSemester) => getSemester(selectedSemester)}
            key={index}
          />
        ))}
        <Link to="/attendanceDetails">
          <button
            className={`${styles.nextButton} ${
              !semester && styles.nextButtonHidden
            }`}
          >
            {/* <img src="/assets/icons/next-page-64.png" alt="continue" /> */}
            <ImageWrapper imgSrc="/assets/icons/next-page-64.png" imgAlt="continue" />
          </button>
        </Link>
      </div>
    </>
  );
};
export default AttendanceStudent;
