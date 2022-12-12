import Roadmap from "./Roadmap";
import Why from "./Why";
import { Col, Row } from "antd";
import Info from "./Info";
import React from "react";

const  Home:React.FC = () =>
  (
    <Row>
      <Col xs={24} md={8}>
        <Info />
      </Col>
      <Col xs={24} md={8}>
        <Why />
      </Col>
      <Col xs={24} md={8}>
        <Roadmap />
      </Col>
    </Row>
  );

export default Home;
