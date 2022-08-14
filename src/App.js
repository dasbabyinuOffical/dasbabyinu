import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Nft from "./Nft.js";
import Footer from "./Footer.js";
import WhitePaper from "./WhitePaper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Layout } from "antd";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/whitePaper" element={<WhitePaper />} />
          <Route path="/nft" element={<Nft />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
