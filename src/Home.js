import Roadmap from "./Roadmap.js";
import Why from "./Why.js";
import TokenSupply from "./TokenSupply.js";
import { Layout, Col, Row } from "antd";
import Info from "./Info.js";

function Home() {
  return (
    <Layout.Content
      className="site-layout"
      style={{
        padding: "0 50px",
        marginTop: 64,
      }}
    >
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
    </Layout.Content>
  );
}

export default Home;
