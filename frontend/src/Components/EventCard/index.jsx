//Third party import
import React, { useState } from "react";
import Tippy from "@tippy.js/react";
import Loader from "react-loader-spinner";
//Stylesheet import
import styles from "./style.module.css";
import ImageWrapper from "Components/Image-Wrapper";

const EventCard = ({ eve, index, _onEventClick }) => {
  //state declaration
  const [isLoaded, _isLoaded] = useState(false);
  //method declaration
  /**
   * @DESC: set the loaded state onLoad of image
   */
  const handleImageLoad = () => {
    _isLoaded((prev) => (prev = true));
  };
  return (
    <div className={styles.EventInfo}>
      <img
        src={eve.eventImage || "/assets/icons/no-image.svg"}
        alt="eventPic"
        id={index}
        onClick={(e) => _onEventClick(e)}
        onLoad={handleImageLoad}
      />
      {!isLoaded && (
        <span className={styles.Loader}>
          <Loader type="Hearts" color="#4CAF50" height={100} width={100} />
        </span>
      )}

      <div>
        <Tippy
          content="click here for details"
          delay={200}
          placement="bottom"
          theme="honeybee"
        >
          <p id={index} onClick={(e) => _onEventClick(e)}>
            {eve.title}
          </p>
        </Tippy>
      </div>
    </div>
  );
};

export default EventCard;
