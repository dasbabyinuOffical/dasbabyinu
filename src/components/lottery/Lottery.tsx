import React from "react";
import "./lottery.css";
import BuyTickets from "./BuyTickets";
import CheckWinner from "./CheckWinner";
import FinishedRounds from "./FinishedRounds";
import HowToPlay from "./HowToPlay";
import Prize from "./Prize";

function Lottery() {
  return (
    <div>
      <BuyTickets />
      <Prize />
      <FinishedRounds />
      <CheckWinner />
      <HowToPlay />
    </div>
  );
}

export default Lottery;
