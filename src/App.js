import Header from "./Header.js";
import Footer from "./Footer.js";
import { Layout } from "antd";
import React from "react";

function App({ Component }) {
  return (
    <Layout>
      <Header />
      <Layout.Content
        className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: 64,
        }}
      >
        {Component}
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
