import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import EventCardPage from "./EventCardpage/EventCardPage";
import { IP } from "../../../IPDetails";

const EventList = (props) => {
  const [event, setEvent] = useState({});
  const [eventLoaded, setEventLoaded] = useState(false);

  useEffect(() => {
    const _id = props.match.params.id;
    axios.get(`${IP}/event/${_id}`).then((res) => {
      console.log("res.data:>>", res.data);
      setEvent(res.data.searchedEvent);
      setEventLoaded(true);
    });
  }, []);

  if (!eventLoaded) {
    return <Skeleton count={5} width={1000} />;
  } else if (event) {
    return <EventCardPage event={event} />;
  } else {
    return <h1>No event Found</h1>;
  }
};

export default EventList;
