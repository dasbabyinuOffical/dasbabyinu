import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useAppSelector } from "../../store/Hook";

function SwapButton() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (inputToken.value === "" || Number(inputToken.value) == 0) {
      setStatus(true);
      return;
    }
    if (outputToken.value === "" || Number(outputToken.value) == 0) {
      setStatus(true);
      return;
    }
    setStatus(false);
  }, [inputToken, outputToken]);
  return (
    <div className="swap-button">
      <Button type="primary" shape="round" size="large" disabled={status}>
        Enter an amount
      </Button>
    </div>
  );
}

export default SwapButton;
