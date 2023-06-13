import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./config.scss";
import PodcastDetails from "./pages/PodcastDetails/PodcastDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/podcast/:id" element={<PodcastDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
