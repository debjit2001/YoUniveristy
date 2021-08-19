import React from "react";
import axios from "axios";
import styles from "./EventListPage.module.css";
import { Spinner } from "reactstrap";
import Tippy from "@tippy.js/react";
import { IP } from "../../IPDetails";
import { useState, useEffect } from "react";

const EventListPage = (props) => {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${IP}/event`).then((res) => {
      setIsLoading(false);
      setEventList(res.data.events);
    });
  }, []);

  const _onEventClick = (eventItem) => {
    eventItem.preventDefault();
    const tragetID = eventItem.target.id;
    const eventID = eventList[tragetID]._id;
    console.log("_onEventClick -> eventID", eventID);
    props.history.push(`event/${eventID}`);
  };

  //create event create handler method
  const modalClickHandler = () => {
    console.log("Modal Open? :>>", isModalOpen);
  };

  return (
    <div className={styles.EventContainer}>
      <button className={styles.createEventButton}>
        <img src="/assets/icons/plus.svg" alt="create" />
      </button>
      {!isLoading ? (
        eventList && eventList.length ? (
          eventList.map((eve, index) => (
            <div className={styles.EventInfo} key={index}>
              <img
                src={`${IP}/${eve.eventImage}`}
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
          ))
        ) : (
          <div
            style={{
              fontWeight: "bold",
              fontSize: 20,
              margin: "10px auto 10px auto",
            }}
          >
            <i className="fas fa-frown"></i>{" "}
            <p style={{ display: "inline" }}>No Events to display</p>{" "}
            <i className="fas fa-frown"></i>
          </div>
        )
      ) : (
        <Spinner role="grow" />
      )}
    </div>
  );
};

export default EventListPage;
