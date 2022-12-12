import { Divider } from "antd";
import React from "react";
import SwapButton from "./SwapButton";
import SwapChange from "./SwapChange";
import SwapCurrencyInput from "./SwapCurrencyInput";
import SwapCurrencyOutput from "./SwapCurrencyOutput";
import SwapPrice from "./SwapPrice";
import SwapSlippage from "./SwapSlippage";

const SwapBody: React.FC = () => (
  <div>
    <SwapCurrencyInput />
    <SwapChange />
    <SwapCurrencyOutput />
    <SwapPrice />
    <SwapSlippage />
    <Divider />
    <SwapButton />
  </div>
);

export default SwapBody;
