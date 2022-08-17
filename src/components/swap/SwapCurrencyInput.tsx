import { Input } from 'antd';
import React from 'react';

const {TextArea} = Input;

let BNB = require('../../images/bnb.png');
let Arrow = require('../../images/arrow.svg');

const SwapCurrencyInput: React.FC = () => (
    <div className='swap-currency'>
        <div className='swap-currency-coin'>
            <div>
                <img src={BNB}/>
                <h3>BNB</h3>
                <img src={Arrow.default}/>
            </div>
            <div>
                <label>Balance:</label>
                <label>0</label>
            </div>
        </div>
        <div className='swap-currency-coin-input'>
            <TextArea  bordered={false} allowClear={true} placeholder="0.0"/>
            <div>
                <span></span>
                <button>Max</button>
            </div>
        </div>
    </div>
);

export default SwapCurrencyInput;
