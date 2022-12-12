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
