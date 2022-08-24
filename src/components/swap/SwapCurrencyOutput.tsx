import { Input } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hook";
import SwapSelectOutputToken from "./SwapSelectOutputToken";
import {
  setOutputTokenVisiable,
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

  const getBalanceOfOutputToken = async () => {
    if (localStorage.getItem("account")) {
      const newBalance = await getBalanceOf(
        OutputToken.contract,
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

            // check textarea input value must be number;
            let value = "0.0";
            if (!isNaN(Number(e.target.value))) {
              value = e.target.value.trim();
            }
            const outToken: TokenInfo = {
              name: OutputToken.name,
              symbol: OutputToken.symbol,
              contract: OutputToken.contract,
              balance: OutputToken.balance,
              value: value,
              visibility: OutputToken.visibility,
            };
            dispatch(setOutputToken(outToken));

            let path: string[] = [outToken.contract, inputToken.contract];
            if (inputToken.symbol !== "BNB" && outToken.symbol !== "BNB") {
              path = [
                inputToken.contract,
                "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                outToken.contract,
              ];
            }
            getAmountsOut(
              outToken.contract,
              value,
              inputToken.contract,
              path
            ).then((res) => {
              console.log("amountOut is:", res);
              const inToken: TokenInfo = {
                name: inputToken.name,
                symbol: inputToken.symbol,
                contract: inputToken.contract,
                balance: inputToken.balance,
                value: res,
                visibility: inputToken.visibility,
              };
              dispatch(setInputToken(inToken));
            });
          }}
        />
        <div>
          <span></span>
          <button
            onClick={() => {
              getBalanceOfOutputToken().then((res) => {
                const token: TokenInfo = {
                  name: OutputToken.name,
                  symbol: OutputToken.symbol,
                  contract: OutputToken.contract,
                  balance: res!,
                  value: res!,
                  visibility: OutputToken.visibility,
                };
                handleOutputTokenMax(token);

                let path: string[] = [
                  OutputToken.contract,
                  inputToken.contract,
                ];
                if (
                  inputToken.symbol !== "BNB" &&
                  OutputToken.symbol !== "BNB"
                ) {
                  path = [
                    inputToken.contract,
                    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                    OutputToken.contract,
                  ];
                }
                // output token.
                getAmountsOut(
                  OutputToken.contract,
                  res!,
                  inputToken.contract,
                  path
                ).then((res) => {
                  console.log("amountOut is:", res);
                  const inToken: TokenInfo = {
                    name: inputToken.name,
                    symbol: inputToken.symbol,
                    contract: inputToken.contract,
                    balance: inputToken.balance,
                    value: res,
                    visibility: inputToken.visibility,
                  };
                  dispatch(setInputToken(inToken));
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
