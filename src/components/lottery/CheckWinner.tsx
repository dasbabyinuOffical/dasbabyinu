import { Button, Space } from "antd";
import React from "react";

let ticketRight = require("../../images/ticket-left.png");
let ticketLeft = require("../../images/ticket-right.png");

function CheckWinner() {
  return (
    <div className="buyTickets-winner">
      <div>
        <img src={ticketLeft} alt="ticketLeft" />
      </div>
      <div>
        <Space direction="vertical">
          <div className="buyTickets-winner-ask">Claim My Rewards</div>
          <div>
            <Button type="primary" shape="round" size="large">
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
