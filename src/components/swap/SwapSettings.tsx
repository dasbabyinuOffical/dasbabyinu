import { Button, Input, Modal, Switch, Tooltip } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import { setSettingsInVisiable } from "../../store/swap/TokenSelect";

let Ask = require("../../images/ask.svg");

function SwapSettings() {
  const visibility = useAppSelector((state) => state.tokenSelect.settings);

  const dispatch = useAppDispatch();

  return (
    <Modal
      title="Settings"
      visible={visibility}
      footer={null}
      destroyOnClose={true}
      closable={true}
      onCancel={() => {
        dispatch(setSettingsInVisiable());
      }}
    >
      <div className="swap-slipper">
        <div>
          <h3>SWAPS & LIQUIDITY</h3>
        </div>

        <div>
          <h4>
            Default Transaction Speed (GWEI)
            <Tooltip title="Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees">
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </h4>
        </div>

        <div className="swap-slipper-select">
          <Button type="primary">Standard(5)</Button>
          <Button type="primary">Fast(6)</Button>
          <Button type="primary">Instant(7)</Button>
        </div>

        <div>
          <h4>
            Slippage Tolerance
            <Tooltip title="Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.">
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </h4>
        </div>

        <div className="swap-slipper-select">
          <Button type="primary">0.1%</Button>
          <Button type="primary">0.5%</Button>
          <Button type="primary">1%</Button>
          <Input suffix="%" />
        </div>

        <div className="swap-slipper-select">
          <div>
            Tx deadline (mins)
            <Tooltip title="Your transaction will revert if it is left confirming for longer than this time.">
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </div>
          <div>
            <Input defaultValue={20} />
          </div>
        </div>

        <div className="swap-slipper-select">
          <div>
            Zap (Beta)
            <Tooltip
              title="Zap enables simple liquidity provision. Add liquidity with one token and one click, without manual swapping or token balancing.
If you experience any issue when adding or removing liquidity, please disable Zap and retry."
            >
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </div>
          <div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="swap-slipper-select">
          <div>
            Expert Mode
            <Tooltip title="Bypasses confirmation modals and allows high slippage trades. Use at your own risk.">
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </div>
          <div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="swap-slipper-select">
          <div>
            Disable Multihops
            <Tooltip title="Restricts swaps to direct pairs only.">
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </div>
          <div>
            <Switch />
          </div>
        </div>

        <div className="swap-slipper-select">
          <div>
            Flippy sounds
            <Tooltip
              title="Flippy sounds
"
            >
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </div>
          <div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SwapSettings;
