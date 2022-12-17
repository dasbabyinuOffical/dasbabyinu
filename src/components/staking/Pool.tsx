import { Card} from "antd";
import React, { useEffect, useState } from "react";
import { PoolId, Reward, Rewards } from "../../util/staking_pool";
import PoolAction from "./PoolAction";
const borderSilver = "0.5rem solid #c0c0c0";

function Pool() {
  const [data, setData] = useState<Reward[]>([]);

  useEffect(()=>{
     (async function(){
        const poolId = await PoolId();
        let rewards:Reward[] = [];
        for(let i = 1;i < poolId;i++){
          const reward: Reward = (await Rewards(i));
           rewards.push(reward);
        }
        setData(rewards);

      })();
    const timer =  setInterval(() => {
      (async function(){
        const poolId = await PoolId();
        let rewards:Reward[] = [];
        for(let i = 1;i <= poolId;i++){
           rewards.push(await Rewards(i));
        }
        setData(rewards);
      })();
     
    }, 5000)

    return ()=>{
      clearInterval(timer);
    }

  },[]);

  return (
    <>
      {data.map((item) => {
        return (
          <Card
            hoverable
            key={item.id}
            bordered={true}
            cover={<label style={{ marginLeft: "4rem" }}>{item.id}:{item.depositSymbol}--{item.rewardSymbol}</label>}
            style={{
              width: "18.5rem",
              height: "23rem",
              display: "inline-block",
              marginLeft: "1rem",
              marginBottom: "1rem",
              verticalAlign: "top",
              borderRadius: "0.5rem",
              fontSize: "small",
              border: borderSilver,
            }}
          >
            <h4>
              TotalReward: <span>{item.supply}{item.rewardSymbol}</span>
            </h4>
            <h4>
              TotalRewardPerDay: <span>{item.totalRewardPerDay}{item.rewardSymbol}</span>
            </h4>
            <h4>
              TotalStake: <span>{item.depositAmount}{item.depositSymbol}</span>
            </h4>
            <h4>
              StartTime:<span>{item.startTime}</span>
            </h4>
            <h4>
              EndTime: <span>{item.endTime}</span>
            </h4>
            <hr/>
            <h4>Staking: {item.amount} {item.depositSymbol}</h4>
            <h4>Reward: {item.reward} {item.rewardSymbol}</h4>
            <h4>RewardPerDay: {item.rewardPerDay} {item.depositSymbol}</h4>
            <PoolAction poolId={item.id} depositToken={item.depositToken} rewardToken={item.rewardToken} depositTokenBalance={item.depositTokenBalance}/>
          </Card>
        );
      })}
    </>
  );
}

export default Pool;
