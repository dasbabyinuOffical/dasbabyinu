import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home.js";
import App from "./App.js";
import Nft from "./Nft.js";
import WhitePaper from "./WhitePaper";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App Component={<Home />} />} />
      <Route path="whitePaper" element={<WhitePaper />} />
      <Route path="nft" element={<App Component={<Nft />} />} />
    </Routes>
  </BrowserRouter>
);
