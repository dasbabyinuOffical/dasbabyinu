import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://127.0.0.1:8080/bsc/contracts";

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
            key: index + 1,
            ID: item.ID,
            chainId: item.chainId,
            contractAddress: item.contractAddress,
            symbol: item.symbol,
            priceUsd: item.priceUsd,
            buyTax: item.buyTax,
            sellTax: item.sellTax,
            holders: item.holders,
            estimateScore: item.estimateScore,
          }));
          setWallets(d);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Contract;
