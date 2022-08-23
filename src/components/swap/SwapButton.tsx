import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useAppSelector } from "../../store/Hook";
import { swap } from "../../util/wallet";

function SwapButton() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const deadline = useAppSelector((state) => state.tokenSelect.deadline);

  const [status, setStatus] = useState(false);

  const account = localStorage.getItem("account");

  useEffect(() => {
    if (inputToken.value === "" || Number(inputToken.value) === 0) {
      setStatus(true);
      return;
    }
    if (outputToken.value === "" || Number(outputToken.value) === 0) {
      setStatus(true);
      return;
    }
    setStatus(false);
  }, [inputToken, outputToken]);

  const doSwap = () => {
    let path: string[] = [inputToken.contract, outputToken.contract];

    if (inputToken.symbol !== "BNB" && outputToken.symbol !== "BNB") {
      path = [
        inputToken.contract,
        "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        outputToken.contract,
      ];
    }
    const deadlineTs = Date.parse(new Date().toString()) + deadline;
    swap(inputToken.value, outputToken.value, path, account!, deadlineTs).then(
      (res) => {
        console.log("swap res is:", res);
      }
    );
  };

  return (
    <div className="swap-button">
      <Button
        type="primary"
        shape="round"
        size="large"
        disabled={status}
        onClick={doSwap}
      >
        {status && "Enter an amount"}
        {!status && "Swap"}
      </Button>
    </div>
  );
}

export default SwapButton;
