import { Button,DatePicker, Form, Input,notification} from "antd";
import React from "react";
import { CreatePool } from "../../util/staking_pool";

function AddPool() {
    const openNotification = (message: string) => {
    const args = {
      message: "Add pool Result",
      description: message,
      duration: 5,
    };
    notification.open(args);
  };

  const onFinish = (values: any) => {
    const depositToken = values.StakeToken;
    const rewardToken  = values.RewardToken;
    const rewardAmount = values.RewardTokenAmount;
    const endDate = Math.round(values.EndDate.valueOf()/1000);
    CreatePool(depositToken,rewardToken,rewardAmount,endDate).then(
      (res) => {
        console.log("res is:", res);
        openNotification("txHash is:"+res);
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



  return (
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
        label="StakeToken"
        name="StakeToken"
        rules={[
          {
            required: true,
            message: "Please input your Stake Token Contract Address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="RewardToken"
        name="RewardToken"
        rules={[
          {
            required: true,
            message: "Please input your Reward Token Conctract Address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="RewardTokenAmount"
        name="RewardTokenAmount"
        rules={[
          {
            required: true,
            message: "Please input your Reward Token Amount!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="EndDate"
        name="EndDate"
        rules={[
          {
            required: true,
            message: "Please input the Reward End Date !",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddPool;
