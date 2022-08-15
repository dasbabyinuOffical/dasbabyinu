import Roadmap from "./Roadmap.js";
import Why from "./Why.js";
import { Col, Row } from "antd";
import Info from "./Info.js";

function Home() {
  return (
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
}

export default Home;
