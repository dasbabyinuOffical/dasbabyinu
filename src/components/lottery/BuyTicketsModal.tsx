import React, { useState } from "react";

import { Input, Modal, Divider, Button, Table, Tooltip, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Search } = Input;
const columns = [
  {
    title: "numbers",
    dataIndex: "number",
    key: "number",
  },
];

function BuyTicketsModal({
  isModalVisible,
  handleCancel,
}: {
  isModalVisible: boolean;
  handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const [numbers, setNumbers] = useState<any[]>([]);

  const [tickets, setTickets] = useState(0);

  const [discount, setDiscount] = useState(0);

  const [cost, setCost] = useState(0);

  const onSearch = () => {
    console.log("max ...");
  };

  const changeTickets = (e: any) => {
    e.preventDefault();
    let cnt = Number(e.target.value);
    setTickets(Number(cnt));

    let generateNumbers: any[] = [];
    // generate radom numbers
    for (let i = 0; i < cnt; i++) {
      let a1 = Math.round(Math.random() * 10);
      let a2 = Math.round(Math.random() * 10);
      let a3 = Math.round(Math.random() * 10);
      let a4 = Math.round(Math.random() * 10);
      let a5 = Math.round(Math.random() * 10);
      let a6 = Math.round(Math.random() * 10);
      let a7 = Math.round(Math.random() * 10);
      let a =
        a1 * 1000000 +
        a2 * 100000 +
        a3 * 10000 +
        a4 * 1000 +
        a5 * 100 +
        a6 * 10 +
        a7;

      generateNumbers.push({
        key: i,
        number: <Input defaultValue={a} maxLength={6} />,
      });
    }
    setNumbers(generateNumbers);

    // set discount
    if (cnt >= 2) {
      setDiscount(0.05);
      setCost((cnt * 99.95) / 100);
    }
    if (cnt >= 50) {
      setDiscount(2.45);
      setCost((cnt * 97.55) / 100);
    }
    if (cnt >= 100) {
      setDiscount(4.95);
      setCost((cnt * 95.05) / 100);
    }
  };

  return (
    <Modal
      title="Buy Tickets"
      visible={isModalVisible}
      footer={null}
      onCancel={handleCancel}
    >
      <div className="buyTicketsModal-title">
        <div>Buy:</div>
        <div>Tickets</div>
      </div>
      <div>
        <Search
          placeholder="input how many tickets you want to buy"
          allowClear
          enterButton="Max"
          size="large"
          defaultValue={tickets}
          onChange={changeTickets}
          onSearch={onSearch}
        />
      </div>
      <div className="buyTicketsModal-title">
        <div></div>
        <div>BUSD Balance: 1.555</div>
      </div>
      <div className="buyTicketsModal-title">
        <div>Cost (BUSD)</div>
        <div>{tickets} BUSD</div>
      </div>
      <div className="buyTicketsModal-title">
        <div>
          {discount}% Bulk discount
          <Tooltip
            placement="topLeft"
            title={
              <div>
                <Space direction="vertical">
                  <div>
                    Buying multiple tickets in a single transaction gives a
                    discount. The discount increases in a linear way, up to the
                    maximum of 100 tickets:{" "}
                  </div>
                  <div>2 tickets: 0.05%</div>
                  <div>50 tickets: 2.45%</div>
                  <div>100 tickets: 4.95%</div>
                </Space>
              </div>
            }
            arrowPointAtCenter
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <div>{cost} BUSD</div>
      </div>
      <Divider />
      <div className="buyTicketsModal-title">
        <div>You Pay</div>
        <div>{cost} BUSD</div>
      </div>
      <div className="buyTicketsModal-buyInstant">
        <Button type="primary" shape="round">
          Buy Instant
        </Button>
      </div>
      <div className="buyTicketsModal-tips">
        "Buy Instantly" chooses random numbers, with no duplicates among your
        tickets. Prices are set before each round starts, equal to $1 at that
        time. Purchases are final.
      </div>
      <Divider />
      <Table dataSource={numbers} columns={columns} />;
    </Modal>
  );
}

export default BuyTicketsModal;
