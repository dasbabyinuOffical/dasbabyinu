import { Card, Divider, Statistic } from "antd";
import TokenSupply from "./TokenSupply";
import Media from "./Media";
import React from "react";

const contract = "0x8e849671C0516Fd9A74075F2349A78390D52aa28";

const Info:React.FC = () => 
  (
    <Card title="Info" bordered={true}>
      <Statistic title="Media" valueRender={() => <Media />} />
      <Statistic
        title="Contract"
        value={contract}
        valueStyle={{ fontSize: "16px", color: "green" }}
      />
      <Statistic title="TotalSupply" value={10000000000} />
      <Statistic title="Holders" value={600} />
      <Statistic title="Current Price" value={`0.000004$`} precision={6} />
      <Statistic title="Slipper" value={"3%(1% for Lp,2% for Market)"} />
      <Divider />
      <TokenSupply />
    </Card>
  );

export default Info;
