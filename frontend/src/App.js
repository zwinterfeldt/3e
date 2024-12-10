import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/")
//       .then((response) => response.json())
//       .then((data) => setMessage(data.message));
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <h1>{message}</h1>
//       <h3>Hello is it me you're looking for</h3>
//     </div>
//   );
// }

// Placeholder components for pages
const Home = () => <h1>Welcome to 3E, your event planning control center</h1>;
const ShareFiles = () => <h1>Share Files</h1>;
const CalendarAndEmail = () => <h1>Calendar and Email</h1>;
const GuestLists = () => <h1>Guest Lists</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share-files" element={<ShareFiles />} />
        <Route path="/calendar-and-email" element={<CalendarAndEmail />} />
        <Route path="/guest-lists" element={<GuestLists />} />
      </Routes>
    </Router>
  );
}

export default App;
