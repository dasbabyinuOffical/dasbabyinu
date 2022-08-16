import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "antd";
import React from "react";

declare var window: any;

let storage = new Map<string,any>()
const  MetaMask: React.FC = () => {
  const [provider, setProvider] = useState({});
  const [account, setAccount] = useState({});

  const connectWallet = async () => {
    if (!window.ethereum) {
      return;
    }
    if (
      storage.get("providerWeb3") &&
      storage.get("account")
    ) {
      return;
    }

    const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await providerWeb3.send("eth_requestAccounts", []);
    if (accounts.length > 0) {
      setProvider(providerWeb3);
      storage.set("providerWeb3", providerWeb3);
      setAccount(accounts[0]);
      storage.set("account", accounts[0]);
    }
  };

  useEffect(() => {
    const providerWeb3 = localStorage.getItem("providerWeb3");
    if (providerWeb3) {
      setProvider(providerWeb3);
    }

    const myAccount = localStorage.getItem("account");
    if (myAccount) {
      setAccount(myAccount);
    }
  }, []);

  return (
    <Button onClick={connectWallet} type="primary">
      {!window.ethereum && "Install MetaMask Wallet"}
      {window.ethereum && !provider && "Connect Wallet"}
      {provider && account && "Disconnect Wallet"}
    </Button>
  );
}

export default MetaMask;
