import React, { useState, useEffect } from "react";

import { Statistic, Card, Divider, Button, Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import BuyTicketsModal from "./BuyTicketsModal";
import {
  totalReward,
  latestLotteryId,
  startTime,
  endTime,
  status,
  userTicketsCnt,
  userTicketsNumber,
} from "../../util/lottery";

const { Countdown } = Statistic;
const LotteryContract = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";

const onFinish = () => {
  console.log("finished!");
};

function formatDate(value: string) {
  var date = new Date();
  date.setTime(Number(value) * 1000);
  var y = date.getFullYear(),
    m = (date.getMonth() + 1).toString(),
    d = date.getDate().toString(),
    h = date.getHours().toString(),
    i = date.getMinutes().toString(),
    s = date.getSeconds().toString();

  if (Number(m) < 10) {
    m = "0" + m;
  }
  if (Number(d) < 10) {
    d = "0" + d;
  }
  if (Number(h) < 10) {
    h = "0" + h;
  }
  if (Number(i) < 10) {
    i = "0" + i;
  }
  if (Number(s) < 10) {
    s = "0" + s;
  }
  var r = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return r;
}

function Prize() {
  const [detail, setDetail] = useState(false);

  const changeDetail = () => {
    setDetail(!detail);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const [totalRewards, setTotalRewards] = useState<string>("0");
  const [currentLotteryId, setCurrentLotteryId] = useState<string>("0");
  const [beginTime, setBeginTime] = useState<string>("0");
  const [deadTime, setDeadTime] = useState<number>(0);
  const [step, setStep] = useState<string>("-1");
  const [myTickets, setMyTickets] = useState<Number>(0);
  const [myTicketsNumber, setMyTicketsNumber] = useState<string[]>([]);
  useEffect(() => {
    const rewardInterval = setInterval(() => {
      // get reward
      totalReward(LotteryContract).then((res) => {
        setTotalRewards(res);
      });
      // get lottery id
      latestLotteryId(LotteryContract).then((res) => {
        setCurrentLotteryId(res);
      });
      // set begin time
      startTime(LotteryContract).then((res) => {
        const ts = formatDate(res);
        console.log("begin time:", res, ts);
        setBeginTime(ts);
      });
      // set end time
      endTime(LotteryContract).then((res) => {
        console.log("end time:", res);
        setDeadTime(Number(res) * 1000);
      });
      // get status
      status(LotteryContract).then((res) => {
        setStep(res);
      });
      // get tickets
      const account = localStorage.getItem("account");
      userTicketsCnt(LotteryContract, account!).then((res) => {
        setMyTickets(res);
        userTicketsNumber(LotteryContract, account!, Number(res)).then(
          (res) => {
            setMyTicketsNumber(res);
            console.log("tickets number: " + res);
          }
        );
      });
    }, 10000);
    return () => {
      clearInterval(rewardInterval);
    };
  }, []);

  return (
    <div className="buyTickets-prize">
      <h1>Get your tickets now!</h1>
      <h2>
        <Countdown
          value={deadTime}
          format="HH:mm:ss:SSS"
          onFinish={onFinish}
          valueStyle={{
            fontSize: "30px",
            color: "rgb(253, 171, 50)",
          }}
        />
        <div>
          <span style={{ color: "white", fontSize: "20px" }}>to end</span>
        </div>
      </h2>
      <Card
        title="Current Draw"
        extra={`#${currentLotteryId} | StartTime: ${beginTime}`}
        style={{ marginTop: "20px" }}
        className="buyTickets-card"
      >
        <Statistic
          value={totalRewards}
          prefix="Prize Pot $"
          valueStyle={{ color: "rgb(118, 69, 217)" }}
        />
        <div>
          <strong>Your tickets:</strong> You have
          <strong>{myTickets.toString()}</strong> ticket this round
          {step === "0" && (
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
          )}
        </div>
        <div>
          <strong>Tickets:</strong>
          <Space direction="horizontal">
            {myTicketsNumber.map((t, i) => (
              <label key={i} className="specialColor">
                {t}
              </label>
            ))}
          </Space>
        </div>
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
                  <strong>{(Number(totalRewards) * 10) / 100} BUSD</strong>
                </div>
                <div>~${(Number(totalRewards) * 10) / 100} </div>
              </Space>
            </Col>
            <Col xs={20} sm={20} md={12} lg={8} xl={4}>
              <Space direction="vertical">
                <div className="buyTickets-prize-title">Match first 2 </div>
                <div>
                  <strong>{(Number(totalRewards) * 20) / 100} BUSD</strong>
                </div>
                <div>~${(Number(totalRewards) * 20) / 100} </div>
              </Space>
            </Col>
            <Col xs={20} sm={20} md={12} lg={8} xl={4}>
              <Space direction="vertical">
                <div className="buyTickets-prize-title">Match All 3 </div>
                <div>
                  <strong>{(Number(totalRewards) * 70) / 100} BUSD</strong>
                </div>
                <div>~${(Number(totalRewards) * 70) / 100} </div>
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
