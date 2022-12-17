import React from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { Stake } from '../../util/staking_pool';

export function StakingModal({
  isModalVisible,
  handleOk,
  handleCancel,
  poolId,
  depositToken,
  rewardToken,
  depositTokenBalance,
}: {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: (e: React.MouseEvent<HTMLElement> | null) => void;
  poolId: number;
  depositToken:string;
  rewardToken:string;
  depositTokenBalance:string;
}) {

   const openNotification = (message: string) => {
    const args = {
      message: "Add pool Result",
      description: message,
      duration: 5,
    };
    notification.open(args);
  };

    const onFinish = (values: any) => {
      console.log("value is:",values);
      const depositToken = values.depositToken;
      const depositAmount = values.depositTokenAmount;
      Stake(poolId,depositToken,depositAmount).then(
        (res) => {
          console.log("res is:", res);
          handleOk();
          openNotification("txHash is:"+res);
        }
      );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal title="Token Staking" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{depositToken:`${depositToken}`,rewardToken:`${rewardToken}`,depositTokenAmount:`${depositTokenBalance}`}}
      >
        <Form.Item
          label="DepositToken"
          name="depositToken"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input  disabled/>
        </Form.Item>
        <Form.Item
          label="RewardToken"
          name="rewardToken"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input  disabled/>
        </Form.Item>
        <Form.Item
          label="DepositTokenAmount"
          name="depositTokenAmount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};
