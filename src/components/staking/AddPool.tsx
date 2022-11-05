import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import React from "react";

function AddPool() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
        label="BaseRewardToken"
        name="BaseRewardToken"
        rules={[
          {
            required: true,
            message: "Please input your Base Reward Token Conctract Address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="BaseRewardTokenAmount"
        name="BaseRewardTokenAmount"
        rules={[
          {
            required: true,
            message: "Please input your Base Reward Token Amount!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ExtraRewardToken"
        name="ExtraRewardToken"
        rules={[
          { required: false, message: "Please input your Extra Reward Token!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ExtraRewardTokenAmount"
        name="ExtraRewardTokenAmount"
        rules={[
          {
            required: false,
            message: "Please input your Extra Reward Token Amount!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="InstantRedeemDays"
        name="InstantRedeemDays"
        rules={[
          {
            required: true,
            message: "Please input the Instant Redeem Days !",
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
