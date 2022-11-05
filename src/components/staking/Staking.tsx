import React from "react";
import { Tabs } from "antd";
import Pool from "./Pool";
import AddPool from "./AddPool";

function Staking() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Pool" key="1">
        <Pool />
      </Tabs.TabPane>
      <Tabs.TabPane tab="AddPool" key="2">
        <AddPool />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Staking;
