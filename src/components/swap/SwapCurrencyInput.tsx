import { Input } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hook";
import SwapSelectInputToken from "./SwapSelectInputToken";
import {
  setInputTokenVisiable,
  TokenInfo,
  setInputToken,
} from "../../store/swap/TokenSelect";

const { TextArea } = Input;
const BaseUrl = "https://pancakeswap.finance/images/tokens/";
let Arrow = require("../../images/arrow.svg");

const SwapCurrencyInput: React.FC = () => {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const dispatch = useAppDispatch();
  let name = inputToken.name;
  let url = BaseUrl + inputToken.contract + ".png";

  const handleInputTokenMax = (token: TokenInfo) => {
    dispatch(setInputToken(token));
  };

  if (inputToken.contract === "BNB") {
    url = require("../../images/bnb.png");
  } else if (inputToken.contract === "DasBaby") {
    url = require("../../images/logo.png");
  }

  return (
    <div className="swap-currency">
      <div className="swap-currency-coin">
        <div
          onClick={() => {
            dispatch(setInputTokenVisiable());
          }}
        >
          <img src={url} alt={name} />
          <h3>{name}</h3>
          <img src={Arrow.default} alt="arrow" />
        </div>
        <div>
          <SwapSelectInputToken />
        </div>
        <div>
          <label>Balance:</label>
          <label>{inputToken.balance}</label>
        </div>
      </div>
      <div className="swap-currency-coin-input">
        <TextArea
          bordered={false}
          allowClear={true}
          placeholder={inputToken.balance}
          value={inputToken.balance}
          onChange={(e) => {
            e.preventDefault();
            const token: TokenInfo = {
              name: inputToken.name,
              symbol: inputToken.symbol,
              contract: inputToken.contract,
              balance: e.target.value,
              visibility: inputToken.visibility,
            };
            dispatch(setInputToken(token));
          }}
        />
        <div>
          <span></span>
          <button
            onClick={() => {
              const token: TokenInfo = {
                name: inputToken.name,
                symbol: inputToken.symbol,
                contract: inputToken.contract,
                balance: "0.00",
                visibility: inputToken.visibility,
              };

              token.balance = "0.00";
              handleInputTokenMax(token);
            }}
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInput;
