import { useState } from "react";
import { ethers, providers } from "ethers";
import { Button } from "antd";
import React from "react";

declare var window: any;

const MetaMask: React.FC = () => {
  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();
  const [account, setAccount] = useState<string | undefined>();

  const connectWallet = async () => {
    if (!window.ethereum) {
      return;
    }
    if (provider && account) {
      return;
    }

    const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await providerWeb3.send("eth_requestAccounts", []);
    console.log("provider is:", providerWeb3);
    console.log("accounts is:", accounts);
    if (accounts.length > 0) {
      setProvider(providerWeb3);
      setAccount(accounts[0]);
      localStorage.setItem("account", accounts[0]);
    }
  };

  const disConnectWallet = async () => {
    if (provider && account) {
      setAccount(undefined);
      setProvider(undefined);
      localStorage.removeItem("account");
    }
  };

  const walletHandler = async () => {
    if (provider && account) {
      console.log("disconnect");
      await disConnectWallet();
      return;
    }
    console.log("connect");
    connectWallet();
  };

  return (
    <Button onClick={walletHandler} type="primary">
      {!window.ethereum && "Install MetaMask"}
      {window.ethereum && !provider && "Connect"}
      {provider && account && `${account.slice(0, 6)},Disconnect`}
    </Button>
  );
};

export default MetaMask;
