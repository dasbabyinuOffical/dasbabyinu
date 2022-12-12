import { Input, List, Modal, Avatar, Button } from "antd";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import {
  setOutputTokenInVisiable,
  setOutputToken,
  TokenInfo,
} from "../../store/swap/TokenSelect";
import { getAmountsOut } from "../../util/wallet";

const SearchUrlPrefix = "https://api.pancakeswap.info/api/v2/tokens/";
const tokens: TokenInfo[] = [
  {
    contract: "0x8e849671C0516Fd9A74075F2349A78390D52aa28",
    name: "DasBaby",
    symbol: "DasBabyInu",
    balance: "0.00",
    value: "0.0",
    visibility: false,
  },
  {
    contract: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    name: "BNB",
    symbol: "BNB",
    balance: "0.00",
    value: "0.0",
    visibility: false,
  },
  {
    contract: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    name: "BUSD",
    symbol: "BUSD",
    balance: "0.00",
    value: "0.0",
    visibility: false,
  },
  {
    contract: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    name: "BTCB",
    symbol: "BTCB",
    balance: "0.00",
    value: "0.0",
    visibility: false,
  },
  {
    contract: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    name: "ETH",
    symbol: "ETH",
    balance: "0.00",
    value: "0.0",
    visibility: false,
  },
  {
    contract: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    symbol: "USDT",
    balance: "0.00",
    value: "0.0",
    visibility: false,
  },
];

const BaseUrl = "https://pancakeswap.finance/images/tokens/";

function SwapSelectToken() {
  const [Tokens, setTokens] = useState(tokens);
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);

  const visibility = useAppSelector(
    (state) => state.tokenSelect.outputToken.visibility
  );
  const dispatch = useAppDispatch();

  const handleOutputTokenImport = async (token: TokenInfo) => {
    let path: string[] = [inputToken.contract, outputToken.contract];
    if (inputToken.symbol !== "BNB" && outputToken.symbol !== "BNB") {
      path = [
        inputToken.contract,
        "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        outputToken.contract,
      ];
    }
    const res = await getAmountsOut(
      inputToken.contract,
      inputToken.value,
      token.contract,
      path
    );
    const outToken: TokenInfo = {
      name: token.name,
      symbol: token.symbol,
      contract: token.contract,
      balance: token.balance,
      value: res,
      visibility: token.visibility,
    };
    dispatch(setOutputToken(outToken));
    setTokens([token]);
  };

  const searchToken = (contractAddr: string) => {
    const url = SearchUrlPrefix + contractAddr;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const item = res.data;
        const token = {
          contract: contractAddr,
          name: item.name,
          symbol: item.symbol,
          balance: "0.00",
          value: "0.0",
          visibility: false,
        };
        setTokens([token]);
      });
  };

  return (
    <Modal
      title="Select a Token"
      visible={visibility}
      footer={null}
      destroyOnClose={true}
      closable={true}
      onCancel={() => {
        dispatch(setOutputTokenInVisiable());
      }}
    >
      <div>
        <Input
          placeholder="Search name or paste address"
          onChange={(e) => {
            e.preventDefault();
            const contract = e.target.value;
            searchToken(contract);
          }}
        />
      </div>
      <div>
        <label>Common Tokens</label>
      </div>
      <div></div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={Tokens}
          renderItem={(item) => {
            let url = BaseUrl + item.contract + ".png";
            console.log("output contract is:", item.contract);
            if (
              item.contract === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
            ) {
              url = require("../../images/bnb.png");
            } else if (
              item.contract === "0x8e849671C0516Fd9A74075F2349A78390D52aa28"
            ) {
              url = require("../../images/logo.png");
            }

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={url} />}
                  title={item.name}
                  description={`${item.symbol} ${item.balance}`}
                />
                <Button
                  type="primary"
                  onClick={() => handleOutputTokenImport(item)}
                  disabled={item.symbol === inputToken.symbol}
                >
                  Import
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </Modal>
  );
}

export default SwapSelectToken;
