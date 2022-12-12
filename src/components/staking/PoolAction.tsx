import { Button,notification } from "antd";
import React, { useState } from "react";
import { Claim,Take,Reedem } from "../../util/staking_pool";
import { StakingModal } from "./StakingModal";

function PoolAction(props:{poolId:number}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleCancel = () => {
    setModalVisible(false);
  };


  const handleOk = () => {
    setModalVisible(false);
  };

  const openNotification = (message: string) => {
    const args = {
      message: "Add pool Result",
      description: message,
      duration: 5,
    };
    notification.open(args);
  };

  const claimAction = ()=>{
    (async function(){
      const hash = await Claim(props.poolId);
      openNotification("txHash is:"+hash);
    })()
  }

  const takeAction = ()=>{
    (async function(){
      const hash = await Take(props.poolId);
      openNotification("txHash is:"+hash);
    })()
  }

  const redeemAction = ()=>{
    (async function(){
      const hash = await Reedem(props.poolId);
      openNotification("txHash is:"+hash);
    })()
  }

  return (
    <div>
      <Button
        type="primary"
        shape="round"
        style={{ padding: "5px", margin: "4px" }}
        onClick={() => {
          setModalVisible(true);
        }}
      >
        Stake
      </Button>
      <Button
        type="primary"
        shape="round"
        style={{ padding: "5px", margin: "3px" }}
        onClick={redeemAction}
      >
        Reedem
      </Button>
      <Button
        type="primary"
        shape="round"
        danger
        style={{ padding: "5px", margin: "3px" }}
        onClick={takeAction}
      >
        Take
      </Button>
      <Button
        type="primary"
        shape="round"
        style={{ padding: "5px", margin: "4px" }}
        onClick={claimAction}
      >
        Claim
      </Button>
      <StakingModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        poolId={props.poolId}
      />
    </div>
  );
}

export default PoolAction;