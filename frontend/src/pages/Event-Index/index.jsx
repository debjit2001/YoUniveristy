/** Third party import **/
import React from "react";

const EventIndex = () => {
  /**
   * State declarations
   */
  const [eventList, _eventList] = useState([]);
  const [isLoading, _isLoading] = useState(true);

  /**
   * useEffects
   */
  useEffect(() => {
    fetchAllEvents();
  }, []);

  /**
   * Method declarations
   */
  const fetchAllEvents = async () => {
    try {
      const eventFetchResponse = await axios.get(`${IP}/event`);
      _isLoading((prev) => (prev = false));
      if (eventFetchResponse?.data?.events) {
        _eventList((prev) => (prev = res?.data?.events));
      }
    } catch (error) {
      _isLoading((prev) => (prev = false));
    }
  };

  const _eventCardClickHandler = (ev) => {
    ev.preventDefault();
    const targetId = ev.target.id;
    const eventID = eventList[targetId]._id;
    props.history.push(`event/${eventID}`);
  };

  return <div>The event index(event-list page/component will go here)</div>;
};

export default EventIndex;
