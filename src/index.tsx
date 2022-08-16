import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import App from "./App";
import Nft from "./Nft";
import Trade from "./Trade";
import WhitePaper from "./WhitePaper";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App Component={<Home />} />} />
      <Route path="whitePaper" element={<WhitePaper />} />
      <Route path="nft" element={<App Component={<Nft />} />} />
      <Route path="trade" element={<App Component={<Trade />} />} />
    </Routes>
  </BrowserRouter>
);
