import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./HomePage.module.css";
// import DarkMode from "./DarkMode";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Spinner animation="grow" role="status" />
      ) : (
        <img
          src="/assets/img/landing-image-large.jpg"
          alt="Landing page photo"
          className={styles.ladingImage}
        />
      )}
    </div>
  );
};
export default HomePage;
