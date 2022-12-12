import React from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { Stake } from '../../util/staking_pool';

export function StakingModal({
  isModalVisible,
  handleOk,
  handleCancel,
  poolId,
}: {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: (e: React.MouseEvent<HTMLElement> | null) => void;
  poolId: number;
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
      const depositToken = values.DepositToken;
      const depositAmount = values.DepositTokenAmount;
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
      <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="DepositToken"
          name="DepositToken"
          rules={[
            {
              required: true,
              message: "Please input your Deposit Token Contract Address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="DepositTokenAmount"
          name="DepositTokenAmount"
          rules={[
            {
              required: true,
              message: "Please input your Deposit Token Amount!",
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