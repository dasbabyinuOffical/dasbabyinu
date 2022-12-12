import React, { useEffect, useState } from "react";
import { Statistic } from "antd";
import BuyTicketsModal from "./BuyTicketsModal";
import { totalReward, status } from "../../util/lottery";

let starSmall = require("../../images/star-small.png");
let startBig = require("../../images/star-big.png");
let threeStar = require("../../images/three-stars.png");
let ticketLeft = require("../../images/ticket-left.png");
let ticketRight = require("../../images/ticket-right.png");

const daiAddress = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";

function BuyTickets() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const [totalRewards, setTotalRewards] = useState<string>("0");
  const [step, setStep] = useState<string>("-1");

  useEffect(() => {
    const rewardInterval = setInterval(() => {
      // get reward
      totalReward(daiAddress).then((res) => {
        setTotalRewards(res);
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
    <div className="buyTickets">
      <div className="buyTickets-imgs">
        <img src={startBig} className="big-star-img" alt="starBig" />
        <img src={starSmall} className="small-star-img" alt="starSmall" />
        <img src={threeStar} className="three-star-img" alt="threeStar" />
        <img src={ticketLeft} className="ticket-left-img" alt="ticketLeft" />
        <img src={ticketRight} className="ticket-right-img" alt="ticketRight" />
        <div className="buyTickets-title">The DasBabySwap Lottery </div>
        <div className="buyTickets-money">
          <Statistic
            value={totalRewards}
            prefix="$"
            valueStyle={{ color: "rgb(253, 171, 50)" }}
          />
        </div>
        <div className="buyTickets-prizes">in prizes! </div>
        <div className="buyTickets-button">
          {step === "0" ? (
            <button
              className="buyTickets-btn"
              onClick={() => {
                setModalVisible(true);
              }}
              disabled={step !== "0" ? true : false}
            >
              BuyTickets
            </button>
          ) : (
            <label className="buyTIckets-label">Not Start Yet!</label>
          )}
        </div>
      </div>
      <BuyTicketsModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default BuyTickets;
