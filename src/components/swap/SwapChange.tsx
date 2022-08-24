import React from "react";
import { Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/Hook";
import { setInputToken, setOutputToken } from "../../store/swap/TokenSelect";

function SwapChange() {
  const inputToken = useAppSelector((state) => state.tokenSelect.inputToken);
  const outputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const dispatch = useAppDispatch();

  const changeDirection = () => {
    dispatch(setInputToken(outputToken));
    dispatch(setOutputToken(inputToken));
  };

  return (
    <div className="swap-change-button">
      <Button
        type="primary"
        shape="circle"
        icon={<SwapOutlined rotate={90} />}
        size="large"
        onClick={changeDirection}
      />
    </div>
  );
}

export default SwapChange;
