import React from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NumberOfEvents />
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
