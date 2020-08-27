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
      <h3>HomePage</h3>
    </div>
  );
};
export default HomePage;
