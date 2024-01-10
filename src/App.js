import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Home";
import LinAlgProject from "./LinAlgProject.js";
import GraphProject from "./GraphProject.js";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linear_algebra" element={<LinAlgProject />} />
        <Route path="/graph_theory" element={<GraphProject />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;