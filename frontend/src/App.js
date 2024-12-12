import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import GuestList from './pages/GuestList';
// import Home from './Home';
// import ShareFiles from './ShareFiles';
// import GuestLists from './GuestLists';
//import CalendarAndEmail from './pages/CalendarAndEmail/CalendarAndEmail';

// Placeholder components for pages
const Home = () => <h1>Welcome to 3E, your event planning control center</h1>;
const ShareFiles = () => <h1>Share Files</h1>;
// GuestLists = () => <h1>Guest Lists</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share-files" element={<ShareFiles />} />
        <Route path="/guest-lists" element={<GuestList />} />
      </Routes>
    </Router>
  );
}

export default App;