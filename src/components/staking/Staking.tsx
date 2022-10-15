import React from "react";
import { Tabs } from "antd";
import Wallet from "./Wallet";
import Strategy from "./Strategy";
import Contract from "./Contract";
import Record from "./Record";
import Log from "./Log";

function Staking() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Wallet" key="1">
        <Wallet />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Strategy" key="2">
        <Strategy />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Contracts" key="3">
        <Contract />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Records" key="4">
        <Record />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Logs" key="5">
        <Log />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Staking;
