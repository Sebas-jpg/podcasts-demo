import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./config.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Switch> */}
        <Route path="/" exact element={<Home />} />
      </Routes>
      {/* </Switch> */}
    </Router>
  );
};

export default App;
