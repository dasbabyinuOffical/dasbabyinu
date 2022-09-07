import React, { useState } from "react";
import { Statistic } from "antd";
import BuyTicketsModal from "./BuyTicketsModal";

let starSmall = require("../../images/star-small.png");
let startBig = require("../../images/star-big.png");
let threeStar = require("../../images/three-stars.png");
let ticketLeft = require("../../images/ticket-left.png");
let ticketRight = require("../../images/ticket-right.png");

function BuyTickets() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

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
            value={116163}
            prefix="$"
            valueStyle={{ color: "rgb(253, 171, 50)" }}
          />
        </div>
        <div className="buyTickets-prizes">in prizes! </div>
        <div className="buyTickets-button">
          <button
            className="buyTickets-btn"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            BuyTickets
          </button>
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
