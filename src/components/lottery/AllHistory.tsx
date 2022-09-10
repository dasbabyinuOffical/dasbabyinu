import React, { useEffect, useState } from "react";
import { Card } from "antd";

function AllHistory() {
  const [detail, setDetail] = useState(false);

  const [lotteryId, setLotteryId] = useState<string>("0");

  const [randomResultNumber, setRandomResultNumber] = useState<string[]>([]);

  useEffect(() => {
    setLotteryId("2");

    setRandomResultNumber(["1", "2", "3"]);
  }, []);

  return (
    <Card
      title={
        <div>
          <div>
            <strong>Round ({lotteryId})</strong>
          </div>
        </div>
      }
      style={{ marginTop: "20px" }}
    >
      <div className="buyTickets-winnning-number">
        <div className="buyTickets-finish-number">
          {randomResultNumber.map((num, i) => (
            <div key={i}>{num}</div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default AllHistory;
