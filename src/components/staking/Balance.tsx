import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://dasbabyinu.com/api/bsc/balances";

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
    title: "balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "estimateValue",
    dataIndex: "estimateValue",
    key: "estimateValue",
  },
  {
    title: "estimateEarnToday",
    dataIndex: "estimateEarnToday",
    key: "estimateEarnToday",
  },
];

interface DataType {
  key: React.Key;
  ID: number;
  contractAddress: string;
  walletAddress: string;
  balance: string;
  estimateValue: number;
  estimateEarnToday: number;
}

function Balance() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const d = data.map((item: DataType, index: number) => ({
            key: item.ID,
            ID: item.ID,
            contractAddress: item.contractAddress,
            walletddress: item.walletAddress,
            balance: item.balance,
            estimateValue: item.estimateValue,
            estimateEarnToday: item.estimateEarnToday,
          }));
          setWallets(d);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Balance;
