import React from "react";

const Refresh = require("../../images/refresh.svg")
const SwapSlippage: React.FC = () =>(
    <div className="swap-slippage">
        <div><label>Slippage Tolerance</label></div>
        <div><label>1%</label></div>
        <div><img src={Refresh} alt="refresh"/></div>
    </div>
)

export default SwapSlippage;