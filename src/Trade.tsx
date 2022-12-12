import { Tabs } from 'antd';
import React from 'react';
import Swap from './components/swap/Swap';

const { TabPane } = Tabs;

const Trade: React.FC = () =>(
    <Tabs defaultActiveKey="1" centered size="large" animated={true}>
    <TabPane tab="Swap" key="1">
      <Swap/>
    </TabPane>
    <TabPane tab="Limit" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Liquidity" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Perpetual" key="4">
      Content of Tab Pane 4
    </TabPane>
  </Tabs>
)

export default Trade;