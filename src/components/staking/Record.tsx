import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://dasbabyinu.com/api/bsc/records";

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
    title: "contractAddress",
    dataIndex: "contractAddress",
    key: "contractAddress",
  },
  {
    title: "walletAddress",
    dataIndex: "walletAddress",
    key: "walletAddress",
  },
  {
    title: "buyPrice",
    dataIndex: "buyPrice",
    key: "buyPrice",
  },
  {
    title: "sellPrice",
    dataIndex: "sellPrice",
    key: "sellPrice",
  },
  {
    title: "buyCost",
    dataIndex: "buyCost",
    key: "buyCost",
  },
  {
    title: "estimateBuyValue",
    dataIndex: "estimateBuyValue",
    key: "estimateBuyValue",
  },
  {
    title: "shouldSellOut",
    dataIndex: "shouldSellOut",
    key: "shouldSellOut",
  },
];

interface DataType {
  key: React.Key;
  ID: number;
  chainId: number;
  sellPosition: number;
  contractAddress: string;
  buyCost: number;
  walletAddress: string;
  buyPrice: number;
  sellPrice: number;
  estimateBuyValue: number;
  shouldSellOut: number;
}

function Record() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const d = data.map((item: DataType, index: number) => ({
            key: index + 1,
            ID: item.ID,
            chainId: item.chainId,
            contractAddress: item.contractAddress,
            buyCost: item.buyCost,
            walletAddress: item.walletAddress,
            buyPrice: item.buyPrice,
            sellPrice: item.sellPrice,
            estimateBuyValue: item.estimateBuyValue,
            shouldSellOut: item.shouldSellOut,
          }));
          setWallets(d);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Record;
