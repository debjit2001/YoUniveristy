import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./HomePage.module.css";
// import DarkMode from "./DarkMode";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const renderSpinner = () => {
    if (loading) {
      return <Spinner animation="grow" role="status" />;
    }
    return null;
  };

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div>
      {/* <DarkMode /> */}
      <div className={styles.imgContainer}>
        {renderSpinner()}
        <img
          src="/assets/img/muzammil-soorma-9MByoiBNN1c-unsplash.jpg"
          alt="collegePic"
          onLoad={() => handleImageLoaded()}
        />
      </div>
    </div>
  );
};
export default HomePage;
