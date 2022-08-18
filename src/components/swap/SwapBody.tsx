import { Divider } from "antd";
import React from "react";
import SwapButton from "./SwapButton";
import SwapCurrencyInput from "./SwapCurrencyInput";
import SwapCurrencyOutput from "./SwapCurrencyOutput";
import SwapPrice from "./SwapPrice";
import SwapSlippage from "./SwapSlippage";

const SwapBody: React.FC = () => (
  <div>
    <SwapCurrencyInput />
    <Divider />
    <SwapCurrencyOutput />
    <SwapPrice />
    <SwapSlippage />
    <Divider />
    <SwapButton />
  </div>
);

export default SwapBody;
