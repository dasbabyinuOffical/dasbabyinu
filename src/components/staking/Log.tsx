import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://127.0.0.1:8080/bsc/logs";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "walletAddress",
    dataIndex: "walletAddress",
    key: "walletAddress",
  },
  {
    title: "action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "suggestion",
    dataIndex: "suggestion",
    key: "suggestion",
  },
];

interface DataType {
  key: React.Key;
  ID: number;
  walletAddress: string;
  action: string;
  status: Boolean;
  description: string;
  suggestion: string;
}

function Log() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const d = data.map((item: DataType, index: number) => ({
            key: index + 1,
            ID: item.ID,
            walletAddress: item.walletAddress,
            action: item.action,
            status: item.status,
            description: item.description,
            suggestion: item.suggestion,
          }));
          setWallets(d);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Log;
