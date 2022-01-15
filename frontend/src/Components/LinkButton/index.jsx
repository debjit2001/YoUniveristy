import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.css";

const LinkButton = ({ targetUrl, buttonText }) => {
  return (
    <Link className={styles.link} to={`/${targetUrl}`}>
      {buttonText || "This is a link"}
    </Link>
  );
};

export default LinkButton;
