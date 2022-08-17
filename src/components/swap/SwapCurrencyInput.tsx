import { Input} from 'antd';
import React from 'react';
import {useAppDispatch } from '../../store/Hook';
import SwapSelectToken from './SwapSelectToken';
import {setVisiable} from "../../store/swap/TokenSelect"

const {TextArea} = Input;

let BNB = require('../../images/bnb.png');
let Arrow = require('../../images/arrow.svg');

const SwapCurrencyInput: React.FC = () => {
    const dispatch = useAppDispatch();
    return (
    <div className='swap-currency'>
        <div className='swap-currency-coin'>
            <div onClick={()=>{
                console.log("onClick")
                dispatch(setVisiable())}
                }>
                <img src={BNB} alt="BNB"/>
                <h3>BNB</h3>
                <img src={Arrow.default} alt="arrow"/>
            </div>
            <div>
              <SwapSelectToken/>
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
}

export default SwapCurrencyInput;
