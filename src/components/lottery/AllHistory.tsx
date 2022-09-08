import React, { useEffect, useState } from "react";
import { Card, Divider, Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { latestLotteryId, randomResult } from "../../util/lottery";

const RandomGenerator = "0x8c6375Aab6e5B26a30bF241EBBf29AD6e6c503c2";

function AllHistory() {
  const [detail, setDetail] = useState(false);

  const [lotteryId, setLotteryId] = useState<string>("0");

  const [randomResultNumber, setRandomResultNumber] = useState<string[]>([]);

  useEffect(() => {
    latestLotteryId(RandomGenerator).then((res) => {
      setLotteryId(res);
    });

    randomResult(RandomGenerator).then((res) => {
      let arr: string[] = [];
      for (let i = res.length - 1; i > 0; i--) {
        arr.push(res[i]);
      }
      setRandomResultNumber(arr);
    });
  }, []);

  const changeDetail = () => {
    setDetail(!detail);
  };
  return (
    <Card
      title={
        <div>
          <div>
            <strong>Round ({lotteryId})</strong>
          </div>
        </div>
      }
      extra=""
      style={{ marginTop: "20px" }}
    >
      <div className="buyTickets-winnning-number">
        <div>Winning Number</div>
        <div className="buyTickets-finish-number">
          {randomResultNumber.map((num, i) => (
            <div key={i}>{num}</div>
          ))}
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
