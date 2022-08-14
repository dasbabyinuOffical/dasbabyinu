import musk from "./images/musk.jpeg";
import lp from "./images/lp.jpg";
import { Card, Divider, Image } from "antd";

function Why() {
  return (
    <Card title="Why DasBaby Token?" bordered={true}>
      <div>1. DasBaby was inspired by ElonMusk.</div>
      <Image src={musk} alt="musk" />
      <Divider />
      <div>2. DasBaby is 100% driven by Community.</div>
      <Divider />
      <div>3. DasBaby LP locked forever(burn to dead address)</div>
      <Image src={lp} alt="lp" />
      <Divider />
      <div>4. DasBaby will lunch many app include NFT/Game/Defi/SocialFi</div>
    </Card>
  );
}

export default Why;
