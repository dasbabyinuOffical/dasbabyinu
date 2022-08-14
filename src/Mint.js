import { ethers, BigNumber } from "ethers";
import Genesis from "./file/Genesis.json";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const contract = "0x74155e8E00D19083033d3f58C0BA25eAE1856f84";

function Mint({ id }) {
  const [disabled, setDisabled] = useState(true);
  const url = "http://dasbabyinu.com/nft/owner/" + id;
  useEffect(() => {
    axios.get(url).then((res) => {
      if (res.data === "0") {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    });
  }, []);

  const openNotification = (message) => {
    const args = {
      message: "Mint Failed",
      description: message,
      duration: 5,
    };
    notification.open(args);
  };

  const mintNft = async (index) => {
    if (!window.ethereum) {
      return;
    }
    const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providerWeb3.getSigner();
    const daiContract = new ethers.Contract(contract, Genesis, providerWeb3);
    const daiContractWithSigner = daiContract.connect(signer);

    try {
      const id = BigNumber.from(index);
      const gas = await daiContractWithSigner.estimateGas.mint(id);
      const transaction = await daiContractWithSigner.mint(id, {
        gasLimit: gas,
      });
      const transactionReceipt = await transaction.wait();
      console.log(transactionReceipt);
    } catch (e) {
      openNotification(e.reason);
    }
  };
  return (
    <Button type="danger" onClick={() => mintNft(id)} disabled={disabled}>
      Mint
    </Button>
  );
}

export default Mint;
