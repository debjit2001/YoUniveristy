import React from "react";
import styles from "./EventCardPage.module.css";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
const EventCardPage = ({ event }) => {
  const [isLoading, setIsLoading] = useState(true);
  const renderSpinner = () => {
    if (isLoading) {
      return <Spinner animation="grow" role="status" />;
    }
    return null;
  };
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const spinner = renderSpinner();
  return (
    <div className={styles.EventCardContainer}>
      <div className={styles.imgContainer}>
        {spinner}
        <img
          src={`http://localhost:5000/${event.eventImage}`}
          alt="EventImage"
          onLoad={() => handleImageLoaded()}
        />
      </div>
      <div className={styles.EventDetailsContainer}>{event.desc}</div>
    </div>
  );
};

export default EventCardPage;
