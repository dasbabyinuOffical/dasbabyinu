import React from "react";
import { useAppDispatch } from "../../store/Hook";
import SwapSettings from "./SwapSettings";
import {
  setSettingsVisiable,
  setRecentTxVisiable,
} from "../../store/swap/TokenSelect";
import RecentTx from "./RecentTx";
const Chart = require("../../images/chart.png");
const Setting = require("../../images/setting.png");
const History = require("../../images/history.png");
const Refresh = require("../../images/refresh.png");

function SwapHeader() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="swap-header">
        <div className="swap-header-chart">
          <img src={Chart} alt="chart" />
        </div>
        <div>
          <h3>Swap</h3>
        </div>
        <div
          onClick={() => {
            dispatch(setSettingsVisiable());
          }}
        >
          <img src={Setting} alt="setting" />
        </div>
        <div
          onClick={() => {
            dispatch(setRecentTxVisiable());
          }}
        >
          <img src={History} alt="history" />
        </div>
        <div>
          <img src={Refresh} alt="refresh" />
        </div>
        <div>
          <SwapSettings />
          <RecentTx />
        </div>
      </div>
      <div style={{ margin: "10px  0 auto", textAlign: "center" }}>
        Trade tokens in an instant
      </div>
    </div>
  );
}

export default SwapHeader;
