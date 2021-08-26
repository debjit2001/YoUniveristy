import React from "react";

import Tippy from "@tippy.js/react";

import styles from "../EventListPage.module.css";

const EventCard = ({ eve, index, _onEventClick }) => {
  return (
    <div className={styles.EventInfo}>
      <img
        src={eve.eventImage || "/assets/icons/no-image.svg"}
        alt="eventPic"
        id={index}
        onClick={(e) => _onEventClick(e)}
      />{" "}
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
