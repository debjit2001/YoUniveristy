//Third party import
import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
//Stylesheet import
import styles from "./styles.module.css";
//Local import
import { IP } from "IPDetails";
import ImageWrapper from "Components/Image-Wrapper";

const EventDetails = (props) => {
  /**
   * state declarations
   */
  const [event, _event] = useState(null);
  const [eventLoaded, _eventLoaded] = useState(false);
  /**
   * useEffect
   */
  //fetch the selected/target event's details from backend
  useEffect(() => {
    const _id = props.match.params.id;
    axios.get(`${IP}/event/${_id}`).then((res) => {
      _event((prev) => (prev = res?.data?.searchedEvent));
    });
  }, [props.match.params.id]);
  //set the document title
  useEffect(() => {
    if (event?.title) document.title = `Event - ${event?.title}`;
  }, [event]);
  //set the loading loading state
  useEffect(() => {
    _eventLoaded((prev) => (prev = true));
  }, [event]);

  //method declarations
  /**
   * @DESC : method to render spinner
   * @returns Spinner | null
   */
  /**
   * @DESC: set state when the event image is loaded
   */
  // const handleImageLoaded = () => {
  //   _isLoading((prev) => (prev = false));
  // };
  //store the value of the render spinner
  //const spinner = renderSpinner();

  if (!eventLoaded || !event) {
    return <Skeleton count={5} width={1000} />;
  } else if (event) {
    return (
      <div className={styles.EventCardContainer}>
        <div className={styles.imgContainer}>
          {/* {spinner} */}
          {/* <img
            src={event?.eventImage || "/assets/icons/no-image.svg"}
            alt={`${event?.title}`}
            onLoad={() => handleImageLoaded()}
          /> */}
          <ImageWrapper  imgSrc={event?.eventImage || "/assets/icons/no-image.svg"}
            imgAlt={`${event?.title}`} />
        </div>
        <div className={styles.detailsContainer}>
          <h2 className={styles.eventTitle}>{event?.title}</h2>
          <div className={styles.eventDescription}>{event?.desc}</div>
        </div>
      </div>
    );
  } else {
    return <h1>No event Found</h1>;
  }
};

export default EventDetails;
