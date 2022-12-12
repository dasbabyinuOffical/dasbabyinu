import { Card, Button, Divider, Space } from "antd";
import React, { useState } from "react";
import PoolAction from "./PoolAction";
const borderBrone = "0.5rem solid #C47222";
const borderSilver = "0.5rem solid #c0c0c0";

function Pool() {
  const [data, setData] = useState([
    { id: 1, name: "Dasbaby" },
    { id: 2, name: "Dasbaby" },
  ]);
  return (
    <>
      {data.map((item) => {
        return (
          <Card
            hoverable
            key={item.id}
            bordered={true}
            cover={<label style={{ marginLeft: "7rem" }}>{item.name}</label>}
            style={{
              width: "18.5rem",
              height: "23rem",
              display: "inline-block",
              marginLeft: "1rem",
              marginBottom: "1rem",
              verticalAlign: "top",
              borderRadius: "0.5rem",
              fontSize: "small",
              border: item.id < 212 ? borderSilver : borderBrone,
            }}
          >
            <h3>
              BaseReward: <span>12345 DasBaby</span>
            </h3>
            <h3>
              BaseRewardAPR: <span>300%</span>
            </h3>
            <h3>
              ExtraRewardToken:<span>400 Doge</span>
            </h3>
            <h3>
              ExtraRewardAPR: <span>400%</span>
            </h3>
            <h3>
              RedeemDuration: <span>7days</span>
            </h3>
            <Divider />
            <h3>PendingReward: 10 Dasbaby</h3>
            <h3>PendingReward: 50 Doge</h3>
            <PoolAction />
          </Card>
        );
      })}
    </>
  );
}

export default Pool;
