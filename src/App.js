// App.js
import React from "react";
import PlanetsDirectory from "./components/PlanetsDirectory";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-title">Star Wars Planets Directory</div>
      </nav>
      <div className="content-container">
        <PlanetsDirectory />
      </div>
    </div>
  );
};

export default App;
