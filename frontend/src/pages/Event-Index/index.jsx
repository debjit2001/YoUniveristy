/** Third party import **/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
//stylesheet import
import style from "./style.module.css";

//local import
import { IP } from "IPDetails";
import EventCreateForm from "Components/EventCreateForm";
import SuccessToast from "Components/Toast/Success";
import EventCreateFailure from "Components/Toast/EventCreateFailure";
import EventCard from "Components/EventCard";
import ImageWrapper from "Components/Image-Wrapper";

const EventIndex = (props) => {
  /**
   * State declarations
   */
  const [eventList, _eventList] = useState([]);
  const [isLoading, _isLoading] = useState(true);
  const [isEventCreated, _isEventCreated] = useState(false);
  const [isEventCreationFailed, _isEventCreationFailed] = useState({
    status: false,
    message: "",
  });
  const [isModalOpen, _isModalOpen] = useState(false);

  /**
   * useEffects
   */
  useEffect(() => {
    fetchAllEvents();
  }, []);

  //Method declarations
  /**
   * @DESC: Fetch all events from database
   */
  const fetchAllEvents = async () => {
    try {
      const eventFetchResponse = await axios.get(`${IP}/event`);
      _isLoading((prev) => (prev = false));
      if (eventFetchResponse?.data?.events) {
        _eventList((prev) => (prev = eventFetchResponse?.data?.events));
      }
    } catch (error) {
      _isLoading((prev) => (prev = false));
    }
  };
  /**
   * @DESC: Handler for click event on event card
   * @param {*} ev
   */
  const _eventCardClickHandler = (ev) => {
    ev.preventDefault();
    const targetId = ev.target.id;
    const eventID = eventList[targetId]._id;
    props.history.push(`event/${eventID}`);
  };
  /**
   * @DESC:Handler for manipulating open/close state of modal
   */
  const modalClickHandler = () => {
    _isModalOpen((prev) => (prev = !isModalOpen));
  };

  return (
    <div className={style.EventContainer}>
      {isEventCreated && <SuccessToast />}
      {isEventCreationFailed.status && (
        <EventCreateFailure error={isEventCreationFailed.message} />
      )}
      {isModalOpen && (
        <EventCreateForm
          open={isModalOpen}
          onCloseModal={modalClickHandler}
          setEventCreationFlag={_isEventCreated}
          setIsEventCreationFailed={_isEventCreationFailed}
        />
      )}
      {!isLoading ? (
        eventList && eventList.length ? (
          eventList.map((eve, index) => (
            <EventCard
              eve={eve}
              index={index}
              _onEventClick={_eventCardClickHandler}
              key={index}
            />
          ))
        ) : (
          <div className={style.NoEventPoster}>
            <i className="fas fa-frown"></i>{" "}
            <p style={{ display: "inline" }}>No Events to display</p>{" "}
            <i className="fas fa-frown"></i>
          </div>
        )
      ) : (
        <span className={style.NoEventPoster}>
          <Spinner role="grow" />
        </span>
      )}
      <button className={style.createEventButton} onClick={modalClickHandler}>
        <img
          src={`/assets/icons/${isModalOpen ? "close" : "plus"}.svg`}
          alt="create"
        />
      </button>
    </div>
  );
};

export default EventIndex;
