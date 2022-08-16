import Header from "./Header";
import Footer from "./Footer";
import { Layout } from "antd";
import React from "react";

const  App = (props: { Component: React.ReactElement}) => 
  (
    <Layout>
      <Header />
      <Layout.Content
        className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: 64,
        }}
      >
        {props.Component}
      </Layout.Content>
      <Footer />
    </Layout>
  );

export default App;
