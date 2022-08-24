import { Input } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hook";
import SwapSelectInputToken from "./SwapSelectInputToken";
import {
  setInputTokenVisiable,
  TokenInfo,
  setInputToken,
  setOutputToken,
} from "../../store/swap/TokenSelect";

import { getBalanceOf, getAmountsOut } from "../../util/wallet";

const { TextArea } = Input;
const BaseUrl = "https://pancakeswap.finance/images/tokens/";
let Arrow = require("../../images/arrow.svg");

function SwapCurrencyInput() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const dispatch = useAppDispatch();
  let name = inputToken.name;
  let url = BaseUrl + inputToken.contract + ".png";

  const handleInputTokenMax = (token: TokenInfo) => {
    dispatch(setInputToken(token));
  };

  if (inputToken.contract === "0x8e849671C0516Fd9A74075F2349A78390D52aa28") {
    url = require("../../images/logo.png");
  }

  const getBalanceOfInputToken = async () => {
    if (localStorage.getItem("account")) {
      const newBalance = await getBalanceOf(
        inputToken.contract,
        localStorage.getItem("account")!
      );
      return newBalance;
    }
  };

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
          value={inputToken.value}
          onChange={(e) => {
            e.preventDefault();

            // check textarea input value must be number;
            let value = "0.0";
            if (!isNaN(Number(e.target.value))) {
              value = e.target.value.trim();
            }
            const inToken: TokenInfo = {
              name: inputToken.name,
              symbol: inputToken.symbol,
              contract: inputToken.contract,
              balance: inputToken.balance,
              value: value,
              visibility: inputToken.visibility,
            };
            dispatch(setInputToken(inToken));

            console.log("swap in change.");
            let path: string[] = [inputToken.contract, outputToken.contract];
            if (inputToken.symbol !== "BNB" && outputToken.symbol !== "BNB") {
              path = [
                inputToken.contract,
                "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                outputToken.contract,
              ];
            }

            getAmountsOut(
              inputToken.contract,
              value,
              outputToken.contract,
              path
            ).then((res) => {
              console.log(
                "amountOut is:",
                inputToken.contract,
                value,
                outputToken.contract,
                res
              );
              const outToken: TokenInfo = {
                name: outputToken.name,
                symbol: outputToken.symbol,
                contract: outputToken.contract,
                balance: outputToken.balance,
                value: res,
                visibility: outputToken.visibility,
              };
              dispatch(setOutputToken(outToken));
            });
          }}
        />
        <div>
          <span></span>
          <button
            onClick={() => {
              getBalanceOfInputToken().then((res) => {
                const token: TokenInfo = {
                  name: inputToken.name,
                  symbol: inputToken.symbol,
                  contract: inputToken.contract,
                  balance: res!,
                  value: res!,
                  visibility: inputToken.visibility,
                };
                handleInputTokenMax(token);

                let path: string[] = [
                  inputToken.contract,
                  outputToken.contract,
                ];
                if (
                  inputToken.symbol !== "BNB" &&
                  outputToken.symbol !== "BNB"
                ) {
                  path = [
                    inputToken.contract,
                    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                    outputToken.contract,
                  ];
                }
                // output token.
                getAmountsOut(
                  inputToken.contract,
                  res!,
                  outputToken.contract,
                  path
                ).then((res) => {
                  console.log("amountOut is:", res);
                  const outToken: TokenInfo = {
                    name: outputToken.name,
                    symbol: outputToken.symbol,
                    contract: outputToken.contract,
                    balance: outputToken.balance,
                    value: res,
                    visibility: outputToken.visibility,
                  };
                  dispatch(setOutputToken(outToken));
                });
              });
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
