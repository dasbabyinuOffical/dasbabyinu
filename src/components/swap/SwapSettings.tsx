import { Button, Input, Modal, Switch, Tooltip } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import {
  setSettingsInVisiable,
  setSelectedSpeed,
  setSelectedSlipper,
  setSelectedDeadline,
} from "../../store/swap/TokenSelect";

let Ask = require("../../images/ask.svg");

function SwapSettings() {
  const visibility = useAppSelector((state) => state.tokenSelect.settings);
  const speed = useAppSelector((state) => state.tokenSelect.speed);
  const slipper = useAppSelector((state) => state.tokenSelect.slipper);
  const deadline = useAppSelector((state) => state.tokenSelect.deadline);

  const dispatch = useAppDispatch();

  const setSpped = (selectedSpped: string) => {
    dispatch(setSelectedSpeed(selectedSpped));
  };

  const setSlipper = (selectedSlipper: number) => {
    dispatch(setSelectedSlipper(selectedSlipper));
  };

  const setDeadline = (selectedDeadline: number) => {
    dispatch(setSelectedDeadline(selectedDeadline));
  };

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
          <Button
            type="primary"
            danger={speed === "Standard" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              setSpped("Standard");
            }}
          >
            Standard(5)
          </Button>
          <Button
            type="primary"
            danger={speed === "Fast" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              setSpped("Fast");
            }}
          >
            Fast(6)
          </Button>
          <Button
            type="primary"
            danger={speed === "Instant" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              setSpped("Instant");
            }}
          >
            Instant(7)
          </Button>
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
          <Button
            type="primary"
            danger={slipper === 0.1 ? true : false}
            onClick={(e) => {
              e.preventDefault();
              setSlipper(0.1);
            }}
          >
            0.1%
          </Button>
          <Button
            type="primary"
            danger={slipper === 0.5 ? true : false}
            onClick={(e) => {
              e.preventDefault();
              setSlipper(0.5);
            }}
          >
            0.5%
          </Button>
          <Button
            type="primary"
            danger={slipper === 1 ? true : false}
            onClick={(e) => {
              e.preventDefault();
              setSlipper(1);
            }}
          >
            1%
          </Button>
          <Input
            value={slipper}
            suffix="%"
            onChange={(e) => {
              e.preventDefault();
              const value = e.target.value;
              let val = Number(value);
              if (isNaN(val)) {
                val = 0.1;
              }
              setSlipper(val);
            }}
          />
        </div>

        <div className="swap-slipper-select">
          <div>
            Tx deadline (mins)
            <Tooltip title="Your transaction will revert if it is left confirming for longer than this time.">
              <img src={Ask.default} alt="slipper" />
            </Tooltip>
          </div>
          <div>
            <Input
              defaultValue={deadline}
              onChange={(e) => {
                e.preventDefault();
                const value = e.target.value;
                let val = Number(value);
                if (isNaN(val)) {
                  val = 20;
                }
                setDeadline(val);
              }}
            />
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
