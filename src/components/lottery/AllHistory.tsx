import React, { useState } from "react";
import { Card, Divider, Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

function AllHistory() {
  const [detail, setDetail] = useState(false);

  const changeDetail = () => {
    setDetail(!detail);
  };
  return (
    <Card
      title={
        <div>
          <div>
            <strong>Round (657)</strong>
          </div>
          <div>Drawn Sep 5, 2022, 8:00 AM</div>
        </div>
      }
      extra="< > >|"
      style={{ marginTop: "20px" }}
    >
      <div className="buyTickets-winnning-number">
        <div>Winning Number</div>
        <div className="buyTickets-finish-number">
          <div>4</div>
          <div>5</div>
          <div>9</div>
          <div>9</div>
          <div>4</div>
          <div>1</div>
        </div>
      </div>
      <Divider />
      <div style={{ display: detail ? "block" : "none" }}>
        <div>
          Match the winning number in the same order to share prizes. Current
          prizes up for grabs:
        </div>
        <Row justify="space-around" wrap={true}>
          <Col xs={20} sm={20} md={12} lg={8} xl={4}>
            <Space direction="vertical">
              <div className="buyTickets-prize-title">Match first 1</div>
              <div>
                <strong>568 BUSD</strong>
              </div>
              <div>~$568</div>
            </Space>
          </Col>
          <Col xs={20} sm={20} md={12} lg={8} xl={4}>
            <Space direction="vertical">
              <div className="buyTickets-prize-title">Match first 2 </div>
              <div>
                <strong>852 BUSD</strong>
              </div>
              <div>~$852</div>
            </Space>
          </Col>
          <Col xs={20} sm={20} md={12} lg={8} xl={4}>
            <Space direction="vertical">
              <div className="buyTickets-prize-title">Match first 3 </div>
              <div>
                <strong>1,419 BUSD</strong>
              </div>
              <div>~$1,419</div>
            </Space>
          </Col>
          <Col xs={20} sm={20} md={12} lg={8} xl={4}>
            <Space direction="vertical">
              <div className="buyTickets-prize-title">Match first 4 </div>
              <div>
                <strong>2,839 BUSD</strong>
              </div>
              <div>~$2,839</div>
            </Space>
          </Col>
          <Col xs={20} sm={20} md={12} lg={8} xl={4}>
            <Space direction="vertical">
              <div className="buyTickets-prize-title">Match first 5 </div>
              <div>
                <strong>5,678 BUSD</strong>
              </div>
              <div>~$5,678</div>
            </Space>
          </Col>
          <Col xs={20} sm={20} md={12} lg={8} xl={4}>
            <Space direction="vertical">
              <div className="buyTickets-prize-title">Match all 6 </div>
              <div>
                <strong>11,353 BUSD</strong>
              </div>
              <div>~$11,353</div>
            </Space>
          </Col>
        </Row>
        <Divider />
      </div>
      <div className="buyTickets-submit" onClick={changeDetail}>
        <span>
          <strong>{detail ? "Hide" : "Detail"}</strong>
        </span>
        <span>{detail ? <UpOutlined /> : <DownOutlined />}</span>
      </div>
    </Card>
  );
}

export default AllHistory;
