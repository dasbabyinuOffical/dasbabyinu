import { Card, Divider, Image } from "antd";
import React from "react";

let musk =  require("./images/musk.jpeg");
let lp = require("./images/lp.jpg");

const Why: React.FC = () =>
  (
    <Card title="Why DasBaby Token?" bordered={true}>
      <div>1. DasBaby was inspired by ElonMusk.</div>
      <Image src={musk} alt="musk" height={"23rem"} />
      <Divider />
      <div>2. DasBaby is 100% driven by Community.</div>
      <Divider />
      <div>3. DasBaby LP locked forever(burn to dead address)</div>
      <Image src={lp} alt="lp" />
      <Divider />
      <div>4. DasBaby will lunch many app include NFT/Game/Defi/SocialFi</div>
    </Card>
  );

export default Why;
