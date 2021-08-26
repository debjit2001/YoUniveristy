import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

import { IP } from "../../IPDetails";

import styles from "./EventListPage.module.css";

import EventCreateForm from "./EventCreateForm";
import SuccessToast from "../Toast/Success";
import EventCreateFailure from "../Toast/EventCreateFailure";
import EventCard from "./EventCard";

const EventListPage = (props) => {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEventCreated, setIsEventCreated] = useState(false);
  const [isEventCreationFailed, setIsEventCreationFailed] = useState({
    status: false,
    message: "",
  });

  const fetchEvent = () => {
    axios.get(`${IP}/event`).then((res) => {
      setIsLoading(false);
      setEventList(res.data.events);
    });
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    isEventCreated && fetchEvent();
  }, [isEventCreated]);

  const _onEventClick = (eventItem) => {
    eventItem.preventDefault();
    const tragetID = eventItem.target.id;
    const eventID = eventList[tragetID]._id;
    console.log("_onEventClick -> eventID", eventID);
    props.history.push(`event/${eventID}`);
  };

  //create event create handler method
  const modalClickHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.EventContainer}>
      {isEventCreated && <SuccessToast />}
      {isEventCreationFailed.status && (
        <EventCreateFailure error={isEventCreationFailed.message} />
      )}
      {isModalOpen && (
        <EventCreateForm
          open={isModalOpen}
          onCloseModal={modalClickHandler}
          setEventCreationFlag={setIsEventCreated}
          setIsEventCreationFailed={setIsEventCreationFailed}
        />
      )}
      {!isLoading ? (
        eventList && eventList.length ? (
          eventList.map((eve, index) => (
            <EventCard
              eve={eve}
              index={index}
              _onEventClick={_onEventClick}
              key={index}
            />
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
      <button className={styles.createEventButton} onClick={modalClickHandler}>
        <img
          src={`/assets/icons/${isModalOpen ? "close" : "plus"}.svg`}
          alt="create"
        />
      </button>
    </div>
  );
};

export default EventListPage;
