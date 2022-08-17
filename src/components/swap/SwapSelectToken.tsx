import { Modal } from 'antd';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/Hook';
import {setInVisiable} from "../../store/swap/TokenSelect"

function SwapSelectToken (){
    const visibility = useAppSelector(state => state.tokenSelect.value);
    const dispatch = useAppDispatch();
    return (
        <Modal title="Select a Token" visible={visibility}  footer={null} destroyOnClose={true} closable={true} onCancel={()=>{
                  dispatch(setInVisiable());
               }}>
        </Modal>
        
    )
}

export default SwapSelectToken;