import React, { useEffect, useState } from "react";
import { Table } from "antd";

const url = "http://127.0.0.1:8080/bsc/wallets";

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
    title: "walletAddress",
    dataIndex: "walletAddress",
    key: "walletAddress",
  },
  {
    title: "principal",
    dataIndex: "principal",
    key: "principal",
  },
  {
    title: "commission",
    dataIndex: "commission",
    key: "commission",
  },
];

interface DataType {
  key: React.Key;
  ID: number;
  chainId: number;
  walletAddress: string;
  principal: number;
  commission: number;
}

function Wallet() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const d = data.map((item: DataType, index: number) => ({
          key: index + 1,
          ID: item.ID,
          chainId: item.chainId,
          walletAddress: item.walletAddress,
          principal: item.principal,
          commission: item.commission,
        }));
        setWallets(d);
      });
  }, []);

  return <Table dataSource={wallets} columns={columns} />;
}

export default Wallet;
