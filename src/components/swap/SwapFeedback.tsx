import React from "react";
import { useAppSelector } from "../../store/Hook";

function SwapFeedback() {
  const OutputToken = useAppSelector((state) => state.tokenSelect.outputToken);
  const slipper = useAppSelector((state) => state.tokenSelect.slipper);
  return (
    <div
      className="swap-feedback"
      style={{
        display:
          OutputToken.value === "0.0" || OutputToken.value === ""
            ? "none"
            : "block",
      }}
    >
      <div className="swap-feedback-item">
        <div>Minimum received</div>
        <div>
          {OutputToken.value} {OutputToken.symbol}
        </div>
      </div>
      <div className="swap-feedback-item">
        <div>Price Impact</div>
        <div>{slipper}%</div>
      </div>
      <div className="swap-feedback-item">
        <div>Liquidity Provider Fee</div>
        <div>0.000225 BNB</div>
      </div>
    </div>
  );
}

export default SwapFeedback;
