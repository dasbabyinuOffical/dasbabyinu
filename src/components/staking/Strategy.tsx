import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://dasbabyinu.com/api/bsc/strategies";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "chainId",
    dataIndex: "chainId",
    key: "chainId",
  },
  {
    title: "sellPosition",
    dataIndex: "sellPosition",
    key: "sellPosition",
  },
  {
    title: "buyValue",
    dataIndex: "buyValue",
    key: "buyValue",
  },
];

interface DataType {
  key: React.Key;
  ID: number;
  chainId: number;
  sellPosition: number;
  buyValue: number;
}

function Strategy() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const d = data.map((item: DataType, index: number) => ({
          key: index + 1,
          ID: item.ID,
          chainId: item.chainId,
          sellPosition: item.sellPosition,
          buyValue: item.buyValue,
        }));
        setWallets(d);
      });
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Strategy;
