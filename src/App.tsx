import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import RepoPage from "./Component/RepoPage";
import GithubProfileFinder from "./Component/GithubProfileFinder";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RepoPage />} />
        <Route path="/gitprofile" element={<GithubProfileFinder />} />
      </Routes>
    </Router>
  );
};

export default App;
