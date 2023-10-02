import { useState } from "react";

const NumberOfEvents = () => {
  const [eventNumber, setEventNumber] = useState(32);
  const handleNumberChange = (event) => {
    const value = event.target.value;
    setEventNumber(value);
  };
  return (
    <div id="number-of-events">
      <label htmlFor="event-number">Number of Events</label>
      <input
        type="text"
        id="event-number"
        name="event-number"
        placeholder="32"
        value={eventNumber}
        onChange={handleNumberChange}
        //defaultValue={32}
      />
    </div>
  );
};

export default NumberOfEvents;
