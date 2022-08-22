import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../store/Hook";
import { getAmountsOut } from "../../util/wallet";

const Refresh = require("../../images/refresh.svg");
function SwapPrice() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);

  const [price, setPrice] = useState("0.0");
  const changePrice = () => {
    getAmountsOut(inputToken.contract, "1", outputToken.contract).then(
      (res) => {
        setPrice(res);
      }
    );
  };

  useEffect(() => {
    changePrice();
  }, [inputToken, outputToken]);

  return (
    <div className="swap-price">
      <div>
        <label>Price</label>
      </div>
      <div>
        <label>
          {price} {outputToken.symbol}
          per {inputToken.symbol}
        </label>
      </div>
      <div>
        <img src={Refresh.default} alt="refresh" />
      </div>
    </div>
  );
}

export default SwapPrice;
