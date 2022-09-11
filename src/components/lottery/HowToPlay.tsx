import { Card, Divider, Row, Col } from "antd";
import React from "react";

let WinningImg = require("../../images/wining.png");
let PrizeImg = require("../../images/prize.png");

function HowToPlay() {
  return (
    <div className="howToPlay">
      <h1 className="howToPlay-title">How to Play</h1>
      <h2 className="howToPlay-subTitle">
        if the digits on your tickets match the winning numbers in the correct
        order, you win a portion of the prize pool. Simple!
      </h2>
      <Row justify="space-around" wrap={true}>
        <Col xs={20} sm={20} md={12} lg={8} xl={4}>
          <Card
            title="STEP 1"
            bordered={true}
            hoverable
            className="howToPlay-card"
          >
            <p style={{ color: "blueviolet" }}>Buy Tickets</p>
            <p>
              Prices are set when the round starts, equal to 1 BUSD per ticket.
            </p>
          </Card>
        </Col>
        <Col xs={20} sm={20} md={12} lg={8} xl={4}>
          <Card
            title="STEP 2"
            bordered={true}
            hoverable
            className="howToPlay-card"
          >
            <p style={{ color: "blueviolet" }}>Wait for the Draw</p>
            <p>
              There is one draw every day alternating between 0 AM UTC and 12 PM
              UTC.
            </p>
          </Card>
        </Col>
        <Col xs={20} sm={20} md={12} lg={8} xl={4}>
          <Card
            title="STEP 3"
            bordered={true}
            hoverable
            className="howToPlay-card"
          >
            <p style={{ color: "blueviolet" }}>Check for Prizes</p>
            <p>
              Once the round’s over, come back to the page and check to see if
              you’ve won!
            </p>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row justify="space-around" wrap={true}>
        <Col xs={20} sm={20} md={10} lg={10} xl={10}>
          <div className="howToPlay-winning-tips">
            <h1 className="specialColor">Winning Criteria</h1>
            <h2>
              <strong>
                The digits on your ticket must match in the correct order to
                win.
              </strong>
            </h2>
            <p>Here’s an example lottery draw, with two tickets, A and B.</p>
            <ul>
              <li>
                Ticket A: The first 3 digits and the last 2 digits match, but
                the 4th digit is wrong, so this ticket only wins a “Match first
                3” prize.
              </li>
              <li>
                Ticket B: Even though the last 5 digits match, the first digit
                is wrong, so this ticket doesn’t win a prize.
              </li>
            </ul>
            <p>
              Prize brackets don’t ‘stack’: if you match the first 3 digits in
              order, you’ll only win prizes from the ‘Match 3’ bracket, and not
              from ‘Match 1’ and ‘Match 2’.
            </p>
          </div>
        </Col>
        <Col xs={20} sm={20} md={10} lg={10} xl={10}>
          <div className="howToPlay-winning-img">
            <img alt="wings" src={WinningImg} />
          </div>
        </Col>
      </Row>

      <Divider />

      <Row justify="space-around" wrap={true}>
        <Col xs={20} sm={10} md={10} lg={10} xl={10}>
          <div>
            <h1 className="specialColor">Prize Funds</h1>
            <p> The prizes for each lottery round come from three sources:</p>
            <h1>Ticket Purchases</h1>
            <ul>
              <li>
                100% of the BUSD paid by people buying tickets that round goes
                back into the prize pools.
              </li>
            </ul>
            <h1>Rollover Prizes</h1>
            <ul>
              <li>
                After every round, if nobody wins in one of the prize brackets,
                the unclaimed CAKE for that bracket rolls over into the next
                round and are redistributed among the prize pools.
              </li>
            </ul>
            <h1>CAKE Injections</h1>
            <ul>
              <li>
                An average total of 35,000 CAKE from the treasury is added to
                lottery rounds over the course of a week. This BUSD is of course
                also included in rollovers! Read more in our guide to BUSD
                Tokenomics
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={20} sm={10} md={10} lg={10} xl={10}>
          <div className="howToPlay-prize-img">
            <img alt="prize percent" src={PrizeImg} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HowToPlay;
