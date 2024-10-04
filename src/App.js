import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./utils/Sidebar";
import Customers from "./components/Customer";
import Projects from "./components/Projects";
import ProjectTypes from "./components/ProjectType";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />=
        <div className="content">
          <Routes>
            <Route path="/" element={<Customers />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project-types" element={<ProjectTypes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
