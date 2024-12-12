import React, { useState, useEffect } from "react";

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/guestlist")
      .then((response) => response.json())
      .then((data) => setGuests(data.guests))
      .catch((error) => console.error("Error fetching guest list:", error));
  }, []);

  return (
    <div>
      <h1>Guest List</h1>
      <ul>
        {guests.map((guest, index) => (
          <li key={index}>{guest}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
