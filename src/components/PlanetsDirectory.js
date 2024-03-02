import React, { useState, useEffect } from "react";
import ResidentsDisplay from "./ResidentsDisplay";

const PlanetsDirectory = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setpreviousPage] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/?format=json")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
        setLoading(false);
        setNextPage(data.next);
      })
      .catch((error) => {
        console.error("Error fetching planets:", error);
        setLoading(false);
      });
  }, []);
  const handleNextPage = () => {
    if (nextPage) {
      fetch(nextPage)
        .then((response) => response.json())
        .then((data) => {
          setPlanets(data.results);
          setNextPage(data.next);
          setpreviousPage(data.previous);
        })
        .catch((error) => console.log(error));
    }
  };
  const handlePrevPage = () => {
    if (previousPage) {
      fetch(previousPage)
        .then((response) => response.json())
        .then((data) => {
          setPlanets(data.results);
          setNextPage(data.next);
          setpreviousPage(data.previous);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <img src="/assets/loader.gif" alt="loader" style={{ width: "80%" }} />
        </div>
      )}
      <div className="planets-container">
        <>
          {planets.map((planet) => (
            <div key={planet.name} className="planet-card">
              <h2>{planet.name}</h2>
              <p>Climate: {planet.climate}</p>
              <p>Population: {planet.population}</p>
              <p>Terrain: {planet.terrain}</p>
              <ResidentsDisplay residents={planet.residents} />
            </div>
          ))}
        </>
      </div>
      {!loading && (
        <div className="w-full flex justify-between items-center">
          {previousPage && (
            <button className="load-more-btn" onClick={handlePrevPage}>
              Previous page
            </button>
          )}
          <button className="load-more-btn" onClick={handleNextPage}>
            Next Page
          </button>
        </div>
      )}
    </>
  );
};

export default PlanetsDirectory;
