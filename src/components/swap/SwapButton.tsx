import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import { swap } from "../../util/wallet";
import { setSelectedTxList } from "../../store/swap/TokenSelect";

function SwapButton() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const deadline = useAppSelector((state) => state.tokenSelect.deadline);
  const slipper = useAppSelector((state) => state.tokenSelect.slipper);
  const txList = useAppSelector((state) => state.tokenSelect.txList);
  const dispatch = useAppDispatch();

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

    console.log("slipper is:", slipper);
    // let outputVal: Number = (Number(outputToken.value) * (100 - slipper)) / 100;

    // keep 1 precision, because calc with slipper may cause overflow
    swap(inputToken.value, outputToken.value, path, account!, deadlineTs).then(
      (res) => {
        console.log("swap res is:", res);
        openNotification(res);

        // success return txHash,which len is 66.
        if (res.length === 66) {
          dispatch(setSelectedTxList([res, ...txList]));
        }
      }
    );
  };

  const openNotification = (message: string) => {
    const args = {
      message: "Swap Result",
      description: message,
      duration: 5,
    };
    notification.open(args);
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
