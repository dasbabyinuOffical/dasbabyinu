import { Button } from "antd";
import React from "react";

function PoolAction() {
  return (
    <div>
      <Button
        type="primary"
        shape="round"
        style={{ padding: "5px", margin: "4px" }}
      >
        Stake
      </Button>
      <Button
        type="primary"
        shape="round"
        style={{ padding: "5px", margin: "3px" }}
      >
        Reedem
      </Button>
      <Button
        type="primary"
        shape="round"
        danger
        style={{ padding: "5px", margin: "3px" }}
      >
        Take
      </Button>
      <Button
        type="primary"
        shape="round"
        style={{ padding: "5px", margin: "4px" }}
      >
        Claim
      </Button>
    </div>
  );
}

export default PoolAction;
