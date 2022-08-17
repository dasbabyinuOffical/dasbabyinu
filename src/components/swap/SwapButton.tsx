import React from 'react';
import { Button } from 'antd';

const SwapButton: React.FC = () => (
    <div className="swap-button">
        <Button type='primary' shape='round' size='large' disabled={true}>Enter an amount</Button>
    </div>
)

export default SwapButton;