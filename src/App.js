import "./App.css";
import Home from "./Home.js";
import Nft from "./Nft.js";
import WhitePaper from "./WhitePaper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/whitePaper" element={<WhitePaper />} />
        <Route path="/nft" element={<Nft />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
