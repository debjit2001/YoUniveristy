import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.css";

const AttendanceCharacterCard = ({ targetUrl, buttonText }) => {
  return (
    <div>
      <Link to={`/${targetUrl}`}>
        <button type="button" className={styles.btn}>
          {buttonText}
        </button>
        <div className="container-fluid"></div>
      </Link>
    </div>
  );
};

export default AttendanceCharacterCard;
