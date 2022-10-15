import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://dasbabyinu.com/api/bsc/contracts";

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
    title: "contractTime",
    dataIndex: "contractTime",
    key: "contractTime",
  },
  {
    title: "isSecurity",
    dataIndex: "isSecurity",
    key: "isSecurity",
  },
  {
    title: "symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "priceUsd",
    dataIndex: "priceUsd",
    key: "priceUsd",
  },
  {
    title: "buyTax",
    dataIndex: "buyTax",
    key: "buyTax",
  },
  {
    title: "sellTax",
    dataIndex: "sellTax",
    key: "sellTax",
  },
  {
    title: "holders",
    dataIndex: "holders",
    key: "holders",
  },
  {
    title: "estimateScore",
    dataIndex: "estimateScore",
    key: "estimateScore",
  },
];

interface DataType {
  key: React.Key;
  ID: number;
  chainId: number;
  sellPosition: number;
  contractAddress: string;
  contractTime: string;
  isSecurity: boolean;
  symbol: string;
  priceUsd: string;
  buyTax: number;
  sellTax: number;
  holders: number;
  estimateScore: number;
}

function Contract() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const d = data.map((item: DataType, index: number) => ({
            key: item.ID,
            ID: item.ID,
            chainId: item.chainId,
            contractAddress: item.contractAddress,
            contractTime: item.contractTime,
            isSecurity: item.isSecurity,
            symbol: item.symbol,
            priceUsd: item.priceUsd,
            buyTax: item.buyTax,
            sellTax: item.sellTax,
            holders: item.holders,
            estimateScore: item.estimateScore,
          }));
          setWallets(d);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Contract;
