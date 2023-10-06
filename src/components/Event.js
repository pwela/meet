import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = (event) => {
    if (showDetails === false) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  };
  return (
    <li className="event">
      <h3>{event ? event.summary : null}</h3>
      <p>{event ? Date(event.created) : null}</p>
      <p>{event ? event.location : null}</p>
      {showDetails ? (
        <div role="region" className="details_section">
          <h3>About event</h3>
          {event ? (
            <>
              <a href={event.htmlLink}>See details on Google Calendar</a>
              <p>{event.description}</p>
            </>
          ) : null}
          <button className="details-btn" onClick={toggleDetails}>
            Hide details
          </button>
        </div>
      ) : (
        <button className="details-btn" onClick={toggleDetails}>
          Show details
        </button>
      )}
    </li>
  );
};

export default Event;
