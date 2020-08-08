import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import EventCardPage from "./EventCardpage/EventCardPage";
import { IP } from "../../../IPDetails";

const EventList = (props) => {
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    axios.get(`${IP}/api/event`).then((res) => {
      setEventList(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (eventList && eventList.length) {
    let event = eventList[props.match.params.id];
    return <EventCardPage event={event} />;
  } else {
    return <Skeleton count={5} width={1000} />;
  }
};

export default EventList;
