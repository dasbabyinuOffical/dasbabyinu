import { Card } from "antd";
import React from "react";
import "./swap.css";
import SwapBody from "./SwapBody";
import SwapFeedback from "./SwapFeedback";
import SwapHeader from "./SwapHeader";

const Swap: React.FC = () => (
  <>
    <Card
      title={<SwapHeader />}
      style={{
        width: "350px",
        height: "600px",
        margin: "auto",
        borderRadius: "1.5rem",
      }}
    >
      <SwapBody />
    </Card>
    <SwapFeedback />
  </>
);

export default Swap;
