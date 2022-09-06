import React from "react";
import { Button, Statistic } from "antd";

let starSmall = require("../../images/star-small.png");
let startBig = require("../../images/star-big.png");
let threeStar = require("../../images/three-stars.png");
let ticketLeft = require("../../images/ticket-left.png");
let ticketRight = require("../../images/ticket-right.png");
let buyTickets = require("../../images/buyTickets.svg");

function BuyTickets() {
  return (
    <div className="buyTickets">
      <div className="buyTickets-imgs">
        <img src={startBig} className="big-star-img" />
        <img src={starSmall} className="small-star-img" />
        <img src={threeStar} className="three-star-img" />
        <img src={ticketLeft} className="ticket-left-img" />
        <img src={ticketRight} className="ticket-right-img" />
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
          <button className="buyTickets-btn">BuyTickets</button>
        </div>
      </div>
    </div>
  );
}

export default BuyTickets;
