import { Input, List, Modal, Avatar, Button } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import {
  setOutputTokenInVisiable,
  setOutputToken,
  TokenInfo,
} from "../../store/swap/TokenSelect";

const Tokens: TokenInfo[] = [
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
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);

  const visibility = useAppSelector(
    (state) => state.tokenSelect.outputToken.visibility
  );
  const dispatch = useAppDispatch();

  const handleOutputTokenImport = (token: TokenInfo) => {
    dispatch(setOutputToken(token));
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
        <Input placeholder="Search name or paste address" />
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