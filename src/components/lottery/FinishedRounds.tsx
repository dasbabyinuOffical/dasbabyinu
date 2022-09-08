import React from "react";
import { Radio } from "antd";
import AllHistory from "./AllHistory";

function FinishedRounds() {
  return (
    <div className="buyTickets-finishRounds">
      <div>
        <div>
          <h1>Finished Rounds</h1>
        </div>

        <div>
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">Winning Number</Radio.Button>
            <Radio.Button value="y">Your Number</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="buyTickets-allhistory">
        <AllHistory />
      </div>
    </div>
  );
}

export default FinishedRounds;
