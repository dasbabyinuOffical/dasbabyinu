import React from 'react';
const  Chart = require("../../images/chart.png");
const  Setting = require("../../images/setting.png");
const History  = require("../../images/history.png");
const Refresh  = require("../../images/refresh.png");

const SwapHeader: React.FC = () =>(
    <div>
    <div className='swap-header'>
        <div className="swap-header-chart"><img src={Chart}/></div>
        <div><h3>Swap</h3></div>
        <div><img src={Setting}/></div>
        <div><img src={History}/></div>
        <div><img src={Refresh}/></div>
    </div>
    <div style={{margin:"10px  0 auto",textAlign:"center"}}>Trade tokens in an instant</div>
    </div>
);

export default SwapHeader;
