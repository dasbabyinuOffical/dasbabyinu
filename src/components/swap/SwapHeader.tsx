import React from 'react';
const  Chart = require("../../images/chart.png");
const  Setting = require("../../images/setting.png");
const History  = require("../../images/history.png");
const Refresh  = require("../../images/refresh.png");

const SwapHeader: React.FC = () =>(
    <div>
    <div className='swap-header'>
        <div className="swap-header-chart"><img src={Chart} alt="chart" /></div>
        <div><h3>Swap</h3></div>
        <div><img src={Setting} alt="setting"/></div>
        <div><img src={History} alt="history"/></div>
        <div><img src={Refresh} alt="refresh"/></div>
    </div>
    <div style={{margin:"10px  0 auto",textAlign:"center"}}>Trade tokens in an instant</div>
    </div>
);

export default SwapHeader;
