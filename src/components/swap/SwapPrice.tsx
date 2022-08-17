import React from "react";

const Refresh = require("../../images/refresh.svg")
const SwapPrice: React.FC = () =>(
    <div className="swap-price">
        <div><label>Price</label></div>
        <div><label>0.0011111 BNB per DasBaby</label></div>
        <div><img src={Refresh.default} alt="refresh" /></div>
    </div>
)

export default SwapPrice;