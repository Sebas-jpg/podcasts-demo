import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/header/Header";
import PodcastDetails from "./pages/PodcastDetails/PodcastDetails";
import EpisodeDetails from "./components/episode-details/EpisodeDetails";
import { LoadingProvider } from "./contexts/NavigationContext";
import "./styles/config.scss";
import "./styles/shared.scss";

const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/podcast/:id" element={<PodcastDetails />} />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetails />}
          />
        </Routes>
      </LoadingProvider>
    </Router>
  );
};

export default App;
