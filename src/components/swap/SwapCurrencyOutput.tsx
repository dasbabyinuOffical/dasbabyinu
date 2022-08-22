import { Input } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hook";
import SwapSelectOutputToken from "./SwapSelectOutputToken";
import {
  setOutputTokenVisiable,
  TokenInfo,
  setOutputToken,
} from "../../store/swap/TokenSelect";
import { getBalanceOf } from "../../util/wallet";

const { TextArea } = Input;
const BaseUrl = "https://pancakeswap.finance/images/tokens/";
let Arrow = require("../../images/arrow.svg");

function SwapCurrencyInput() {
  const OutputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const dispatch = useAppDispatch();
  let name = OutputToken.name;
  let url = BaseUrl + OutputToken.contract + ".png";

  const handleOutputTokenMax = (token: TokenInfo) => {
    dispatch(setOutputToken(token));
  };

  if (OutputToken.contract === "0x8e849671C0516Fd9A74075F2349A78390D52aa28") {
    url = require("../../images/logo.png");
  }

  const [balance, setBalance] = useState("0.0");
  const getBalanceOfInputToken = async () => {
    if (localStorage.getItem("account")) {
      const newBalance = await getBalanceOf(
        OutputToken.contract,
        localStorage.getItem("account")!
      );
      setBalance(newBalance);
    }
  };

  return (
    <div className="swap-currency">
      <div className="swap-currency-coin">
        <div
          onClick={() => {
            dispatch(setOutputTokenVisiable());
          }}
        >
          <img src={url} alt={name} />
          <h3>{name}</h3>
          <img src={Arrow.default} alt="arrow" />
        </div>
        <div>
          <SwapSelectOutputToken />
        </div>
        <div>
          <label>Balance:</label>
          <label>{OutputToken.balance}</label>
        </div>
      </div>
      <div className="swap-currency-coin-input">
        <TextArea
          bordered={false}
          allowClear={true}
          placeholder={OutputToken.balance}
          value={OutputToken.value}
          onChange={(e) => {
            e.preventDefault();
            getBalanceOfInputToken().then((res) => {
              const token: TokenInfo = {
                name: OutputToken.name,
                symbol: OutputToken.symbol,
                contract: OutputToken.contract,
                balance: balance,
                value: e.target.value,
                visibility: OutputToken.visibility,
              };
              dispatch(setOutputToken(token));
            });
          }}
        />
        <div>
          <span></span>
          <button
            onClick={() => {
              const token: TokenInfo = {
                name: OutputToken.name,
                symbol: OutputToken.symbol,
                contract: OutputToken.contract,
                balance: balance,
                value: balance,
                visibility: OutputToken.visibility,
              };

              token.balance = "0.00";
              handleOutputTokenMax(token);
            }}
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapCurrencyInput;
