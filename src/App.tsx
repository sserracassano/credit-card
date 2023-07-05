import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import CardCustomizer from "./Pages/CardCustomizer";
import SavedCards from "./Pages/SavedCards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CardCustomizer />} />
      <Route path="/savedcards" element={<SavedCards />} />
    </Routes>
  );
}

export default App;
