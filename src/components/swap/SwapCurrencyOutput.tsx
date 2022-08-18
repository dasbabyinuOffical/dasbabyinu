import { Input } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hook";
import SwapSelectOutputToken from "./SwapSelectOutputToken";
import {
  setOutputTokenVisiable,
  TokenInfo,
  setOutputToken,
} from "../../store/swap/TokenSelect";

const { TextArea } = Input;
const BaseUrl = "https://pancakeswap.finance/images/tokens/";
let Arrow = require("../../images/arrow.svg");

const SwapCurrencyInput: React.FC = () => {
  const OutputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const dispatch = useAppDispatch();
  let name = OutputToken.name;
  let url = BaseUrl + OutputToken.contract + ".png";

  const handleOutputTokenMax = (token: TokenInfo) => {
    dispatch(setOutputToken(token));
  };

  if (OutputToken.contract === "BNB") {
    url = require("../../images/bnb.png");
  } else if (OutputToken.contract === "DasBaby") {
    url = require("../../images/logo.png");
  }

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
          value={OutputToken.balance}
          onChange={(e) => {
            e.preventDefault();
            const token: TokenInfo = {
              name: OutputToken.name,
              symbol: OutputToken.symbol,
              contract: OutputToken.contract,
              balance: e.target.value,
              visibility: OutputToken.visibility,
            };
            dispatch(setOutputToken(token));
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
                balance: "0.00",
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
};

export default SwapCurrencyInput;
