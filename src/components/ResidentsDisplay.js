import React, { useState, useEffect } from "react";

const ResidentsDisplay = ({ residents }) => {
  const [residentData, setResidentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentPromises = residents.map((residentUrl) =>
        fetch(residentUrl).then((response) => response.json())
      );

      Promise.all(residentPromises)
        .then((data) => {
          setResidentData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching residents:", error);
          setLoading(false);
        });
    };

    fetchResidents();
  }, [residents]);

  return (
    <div className="residents-container">
      {loading ? (
         <div className="w-full h-full flex justify-center items-center">
          <img
            src="/assets/loader.gif"
            alt="loader"
            style={{ width: "100%" }}
          />
        </div>
       
      ) : (
        <div>
          {residentData.length > 0 ? (
            <>
              <h3>Residents:</h3>
              {residentData.map((resident) => (
                <div key={resident.name} className="resident-card">
                  <p>Name: {resident.name}</p>
                  <p>Height: {resident.height}</p>
                  <p>Mass: {resident.mass}</p>
                  <p>Gender: {resident.gender}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No residents found</p>
            /* You can replace this with a graphic or any other message */
          )}
        </div>
      )}
    </div>
  );
};

export default ResidentsDisplay;
