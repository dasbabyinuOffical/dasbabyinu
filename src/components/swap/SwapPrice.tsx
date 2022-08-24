import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../store/Hook";
import { getAmountsOut } from "../../util/wallet";

const Refresh = require("../../images/refresh.svg");
function SwapPrice() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);

  const [price, setPrice] = useState("0.0");
  const changePrice = () => {
    let path: string[] = [inputToken.contract, outputToken.contract];
    if (inputToken.symbol !== "BNB" && outputToken.symbol !== "BNB") {
      path = [
        inputToken.contract,
        "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        outputToken.contract,
      ];
    }
    getAmountsOut(inputToken.contract, "1", outputToken.contract, path).then(
      (res) => {
        setPrice("0.0");
        setTimeout(() => {
          setPrice(res);
        }, 1000);
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
      <div
        className="swap-price-refresh"
        onClick={() => {
          changePrice();
        }}
      >
        <img src={Refresh.default} alt="refresh" />
      </div>
    </div>
  );
}

export default SwapPrice;
