import React, { useState } from "react";

import { Statistic, Card, Divider, Button, Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import BuyTicketsModal from "./BuyTicketsModal";

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
const onFinish = () => {
  console.log("finished!");
};

function Prize() {
  const [detail, setDetail] = useState(false);

  const changeDetail = () => {
    setDetail(!detail);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <div className="buyTickets-prize">
      <h1>Get your tickets now!</h1>
      <h2>
        <Countdown
          value={deadline}
          format="HH:mm:ss:SSS"
          onFinish={onFinish}
          valueStyle={{
            fontSize: "40px",
            color: "rgb(253, 171, 50)",
          }}
        />
        <div>
          <span style={{ color: "white", fontSize: "20px" }}>
            until the draw
          </span>
        </div>
      </h2>
      <Card
        title="Next Draw"
        extra="#648 | Draw: Sep 6, 2022, 8:00 PM"
        style={{ marginTop: "20px" }}
        className="buyTickets-card"
      >
        <Statistic
          value={116163}
          prefix="Prize Pot $"
          valueStyle={{ color: "rgb(118, 69, 217)" }}
        />
        <p>
          <strong>Your tickets:</strong> You have <strong>0</strong> ticket this
          round
          <Button
            shape="round"
            type="primary"
            style={{ backgroundColor: "rgb(31, 199, 212)" }}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            BuyTickets
          </Button>
        </p>
        <Divider />
        <div
          className="buyTickets-prize-content"
          style={{ display: detail ? "block" : "none" }}
        >
          <div className="buyTickets-prize-tips">
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
      <BuyTicketsModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default Prize;
