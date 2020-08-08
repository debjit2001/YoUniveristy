import React from "react";
import axios from "axios";
import styles from "./EventListPage.module.css";
import { Spinner } from "reactstrap";
import Tippy from "@tippy.js/react";
import { IP } from "../../IPDetails";
import { useState, useEffect } from "react";

const EventListPage = (props) => {
  const [eventList, setEventList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`${IP}/api/event`).then((res) => {
      console.log("EventListPage -> res:", res);
      setEventList(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onEventClick = (eventItem) => {
    eventItem.preventDefault();
    const eventID = eventItem.target.id;
    props.history.push(`event/${eventID}`);
  };

  return (
    <div className={styles.EventContainer}>
      {eventList && eventList.length ? (
        eventList.map((eve, index) => (
          <div className={styles.EventInfo} key={index}>
            <img
              src={eve.eventImg}
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
                  {eve.eventTitle}
                </p>
              </Tippy>
            </div>
          </div>
        ))
      ) : (
        <Spinner role="grow" />
      )}
    </div>
  );
};

export default EventListPage;
