<<<<<<< HEAD
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
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
// import Home from './Home';
// import ShareFiles from './ShareFiles';
// import GuestLists from './GuestLists';
import CalendarAndEmail from './pages/CalendarAndEmail/CalendarAndEmail';

// Placeholder components for pages
const Home = () => <h1>Welcome to 3E, your event planning control center</h1>;
const ShareFiles = () => <h1>Share Files</h1>;
const GuestLists = () => <h1>Guest Lists</h1>;
// const CalendarAndEmail = ({ message }) => <h1>{message}</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share-files" element={<ShareFiles />} />
        <Route path="/contact" element={<CalendarAndEmail />} />
        <Route path="/guest-lists" element={<GuestLists />} />
      </Routes>
    </Router>
>>>>>>> 43c907ec3ed475800f7b8d0fe629aacbf9adb0b1
  );
}

export default App;
