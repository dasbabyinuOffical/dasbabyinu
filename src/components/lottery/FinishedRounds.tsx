import React, { useEffect, useState } from "react";
import { latestLotteryId, randomResult } from "../../util/lottery";
const LotteryContract = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";

function FinishedRounds() {
  const [currentLotteryId, setCurrentLotteryId] = useState<string>("0");
  const [randomResultNumber, setRandomResultNumber] = useState<string[]>([
    "",
    "",
    "",
  ]);
  useEffect(() => {
    const rewardInterval = setInterval(() => {
      // get lottery id
      latestLotteryId(LotteryContract).then((res) => {
        setCurrentLotteryId(res);
      });

      // get random number
      randomResult(LotteryContract).then((res) => {
        console.log("finish number is:", res);
        if (res.length === 0) {
          setRandomResultNumber(["", "", ""]);
        }
        if (res.length > 0) {
          setRandomResultNumber(res);
        }
      });
    }, 10000);
    return () => {
      clearInterval(rewardInterval);
    };
  }, []);

  return (
    <div className="buyTickets-finishRounds">
      <div>
        <div>
          <h1>Finished Rounds:({currentLotteryId})</h1>
        </div>
      </div>
      <div className="buyTickets-allhistory">
        <div className="buyTickets-winnning-number">
          <div className="buyTickets-finish-number">
            {randomResultNumber.map((num, i) => (
              <div key={i}>{num}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishedRounds;
