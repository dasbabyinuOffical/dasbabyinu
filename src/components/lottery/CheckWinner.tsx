import { Button, Space, notification } from "antd";
import React, { useEffect, useState } from "react";
import { userReward, status, claimTickets } from "../../util/lottery";

let ticketRight = require("../../images/ticket-left.png");
let ticketLeft = require("../../images/ticket-right.png");
const LotteryContract = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";

function CheckWinner() {
  const [userRewards, setUserRewards] = useState<string>("0");
  const [step, setStep] = useState<string>("-1");
  useEffect(() => {
    const rewardInterval = setInterval(() => {
      // get reward
      const account = localStorage.getItem("account");
      userReward(LotteryContract, account!).then((res) => {
        setUserRewards(res);
      });

      // get status
      status(LotteryContract).then((res) => {
        setStep(res);
      });
    }, 10000);
    return () => {
      clearInterval(rewardInterval);
    };
  }, []);

  const openNotification = (result: string, tx: string) => {
    let desc = "trscation id is:" + tx;
    if (result === "fail") {
      desc = "Check your wallet.";
    }
    notification.open({
      message: "Buy Tickets Result:" + result,
      description: desc,
    });
  };

  const onClaim = () => {
    claimTickets(LotteryContract).then((res) => {
      openNotification("Success", res);
    });
  };
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
              onClick={onClaim}
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
