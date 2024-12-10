import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>{message}</h1>
      <h3>Hello is it me you're looking for</h3>
    </div>
  );
}

export default App;
