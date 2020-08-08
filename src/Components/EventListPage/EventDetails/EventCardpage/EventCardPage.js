import React from "react";
import styles from "./EventCardPage.module.css";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
const EventCardPage = (props) => {
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

  const { event } = props;
  const spinner = renderSpinner();
  return (
    <div className={styles.EventCardContainer}>
      <div className={styles.imgContainer}>
        {spinner}
        <img
          src={event.eventImg}
          alt="EventImage"
          onLoad={() => handleImageLoaded()}
        />
      </div>
      <div className={styles.EventDetailsContainer}>{event.eventDetails}</div>
    </div>
  );
};

export default EventCardPage;
