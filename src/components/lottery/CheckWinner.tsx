import { Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { userReward, status } from "../../util/lottery";

let ticketRight = require("../../images/ticket-left.png");
let ticketLeft = require("../../images/ticket-right.png");
const daiAddress = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";

function CheckWinner() {
  const [userRewards, setUserRewards] = useState<string>("0");
  const [step, setStep] = useState<string>("-1");
  useEffect(() => {
    const rewardInterval = setInterval(() => {
      // get reward
      const account = localStorage.getItem("account");
      userReward(daiAddress, account!).then((res) => {
        setUserRewards(res);
      });

      // get status
      status(daiAddress).then((res) => {
        setStep(res);
      });
    }, 10000);
    return () => {
      clearInterval(rewardInterval);
    };
  }, []);
  return (
    <div className="buyTickets-winner">
      <div>
        <img src={ticketLeft} alt="ticketLeft" />
      </div>
      <div>
        <Space direction="vertical">
          <div className="buyTickets-winner-ask">Rewards:${userRewards}</div>
          <div>
            <Button
              type="primary"
              shape="round"
              size="large"
              disabled={step !== "2"}
            >
              Claim Now
            </Button>
          </div>
        </Space>
      </div>
      <div>
        <img src={ticketRight} alt="ticketRight" />
      </div>
    </div>
  );
}

export default CheckWinner;
