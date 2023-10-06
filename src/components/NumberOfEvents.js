//import { useState } from "react";
//import { waitFor } from '@testing-library/react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  // const [eventNumber, setEventNumber] = useState(32);
  const handleNumberChange = (event) => {
    const value = event.target.value;
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-number">Number of Events: </label>
      <input
        type="text"
        id="event-number"
        name="event-number"
        placeholder="32"
        value={currentNOE}
        onChange={handleNumberChange}
        defaultValue={32}
      />
    </div>
  );
};

export default NumberOfEvents;
