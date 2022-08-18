import { Input, List, Modal, Avatar, Button } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import {
  setInputTokenInVisiable,
  setInputToken,
  TokenInfo,
} from "../../store/swap/TokenSelect";

const Tokens: TokenInfo[] = [
  {
    contract: "DasBaby",
    name: "DasBaby",
    symbol: "DasBabyInu",
    balance: "0.00",
    visibility: false,
  },
  {
    contract: "BNB",
    name: "BNB",
    symbol: "BNB",
    balance: "0.00",
    visibility: false,
  },
  {
    contract: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    name: "BUSD",
    symbol: "BUSD",
    balance: "0.00",
    visibility: false,
  },
  {
    contract: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    name: "BTCB",
    symbol: "BTCB",
    balance: "0.00",
    visibility: false,
  },
  {
    contract: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    name: "ETH",
    symbol: "ETH",
    balance: "0.00",
    visibility: false,
  },
  {
    contract: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    symbol: "USDT",
    balance: "0.00",
    visibility: false,
  },
];

const BaseUrl = "https://pancakeswap.finance/images/tokens/";

function SwapSelectToken() {
  const visibility = useAppSelector(
    (state) => state.tokenSelect.inputToken.visibility
  );
  const dispatch = useAppDispatch();

  const handleInputTokenImport = (token: TokenInfo) => {
    dispatch(setInputToken(token));
  };

  return (
    <Modal
      title="Select a Token"
      visible={visibility}
      footer={null}
      destroyOnClose={true}
      closable={true}
      onCancel={() => {
        dispatch(setInputTokenInVisiable());
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
            if (item.contract === "BNB") {
              url = require("../../images/bnb.png");
            } else if (item.contract === "DasBaby") {
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
                  onClick={() => handleInputTokenImport(item)}
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
