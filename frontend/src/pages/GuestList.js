/**import React, { useState, useEffect } from "react";

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

export default GuestList;*/
import React, { useState, useEffect } from "react";

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState("");
  const [updateGuest, setUpdateGuest] = useState({ oldName: "", newName: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch guest list on component mount
  useEffect(() => {
    fetch("http://localhost:5000/guestlist")
      .then((response) => response.json())
      .then((data) => setGuests(data.guests))
      .catch((error) => setErrorMessage("Failed to fetch guest list"));
  }, []);

  // Add a new guest
  const addGuest = () => {
    fetch("http://localhost:5000/guestlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newGuest }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setGuests([...guests, newGuest]);
          setNewGuest("");
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch(() => setErrorMessage("Failed to add guest"));
  };

  // Remove a guest
  const removeGuest = (name) => {
    fetch(`http://localhost:5000/guestlist/${name}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setGuests(guests.filter((guest) => guest !== name));
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch(() => setErrorMessage("Failed to remove guest"));
  };

  // Modify a guest name
  const modifyGuest = () => {
    fetch(`http://localhost:5000/guestlist/${updateGuest.oldName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updateGuest.newName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setGuests(
            guests.map((guest) =>
              guest === updateGuest.oldName ? updateGuest.newName : guest
            )
          );
          setUpdateGuest({ oldName: "", newName: "" });
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch(() => setErrorMessage("Failed to modify guest"));
  };

  return (
    <div style={{textAlign: "center"}}>
      <h1 style={{marginTop:"20px"}}>Guest List</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ol>
        {guests.map((guest,index) => (
          <li key={index}>
            {index+1} . {" "}{guest}{" "}
            <button onClick={() => removeGuest(guest)}>Remove</button>
          </li>
        ))}
      </ol>
      <div>
        <h3>Add Guest</h3>
        <input
          type="text"
          value={newGuest}
          onChange={(e) => setNewGuest(e.target.value)}
          placeholder="Enter guest name"
        />
        <button onClick={addGuest}>Add</button>
      </div>
      <div>
        <h3 style={{marginTop: '30px'}}>Modify Guest</h3>
        <input
          type="text"
          value={updateGuest.oldName}
          onChange={(e) =>
            setUpdateGuest({ ...updateGuest, oldName: e.target.value })
          }
          placeholder="Old name"
        />
        <input
          type="text"
          value={updateGuest.newName}
          onChange={(e) =>
            setUpdateGuest({ ...updateGuest, newName: e.target.value })
          }
          placeholder="New name"
        />
        <button onClick={modifyGuest}>Modify</button>
      </div>
    </div>
  );
};

export default GuestList;

