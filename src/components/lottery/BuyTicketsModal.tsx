import React, { useEffect, useState } from "react";

import {
  Input,
  Modal,
  Divider,
  Button,
  Table,
  Tooltip,
  Space,
  notification,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { getBalanceOf } from "../../util/wallet";
import {
  calculateTotalPriceForBulkTickets,
  ApproveBUSD,
  buyTickets,
} from "../../util/lottery";

const { Search } = Input;
const columns = [
  {
    title: "numbers",
    dataIndex: "number",
    key: "number",
  },
];

const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const LotteryContract = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";

function BuyTicketsModal({
  isModalVisible,
  handleCancel,
}: {
  isModalVisible: boolean;
  handleCancel: (e: React.MouseEvent<HTMLElement> | null) => void;
}) {
  const [numbers, setNumbers] = useState<any[]>([]);

  const [discount, setDiscount] = useState<Number>(0);

  const [tickets, setTickets] = useState<Number>(0);

  const [cost, setCost] = useState<Number>(0);

  const [balance, setBalance] = useState("");

  useEffect(() => {
    let account = localStorage.getItem("account");
    console.log("account is:", account, "BUSD is:", BUSD);
    if (account) {
      getBalanceOf(BUSD, account).then((res) => {
        setBalance(res);
      });
    }
  }, []);

  const onSearch = () => {
    let max = Math.round(Number(balance));
    generateTicketsNumber(max);
  };

  const generateTicketsNumber = (cnt: Number) => {
    setTickets(cnt);
    console.log("in generateTicketsNumber,cnt is:", cnt);
    let generateNumbers: any[] = [];
    // generate radom numbers
    for (let i = 0; i < cnt; i++) {
      const a1 = Math.floor(Math.random() * 10).toString();
      const a2 = Math.floor(Math.random() * 10).toString();
      const a3 = Math.floor(Math.random() * 10).toString();
      const a = "1" + a1 + a2 + a3;
      generateNumbers.push({
        key: i,
        number: (
          <Input
            defaultValue={a.toString().slice(1, 4)}
            maxLength={3}
            key={i}
            value={a.toString().slice(1, 4)}
            disabled
          />
        ),
        data: a,
      });
    }
    setNumbers(generateNumbers);
    console.log("generateNumbers:", generateNumbers);

    if (cnt >= 100) {
      setDiscount(30);
      setCost((Number(cnt) * 70) / 100);
      return;
    }

    if (cnt >= 20) {
      setDiscount(20);
      setCost((Number(cnt) * 80) / 100);
      return;
    }

    // set discount
    if (cnt >= 5) {
      setDiscount(10);
      setCost((Number(cnt) * 90) / 100);
      return;
    }

    setDiscount(0);
    setCost(cnt);
    return;
  };

  const changeTickets = (e: any) => {
    e.preventDefault();
    let cnt = Number(e.target.value);
    generateTicketsNumber(cnt);
  };

  const openNotification = (result: string, tx: string) => {
    let desc = "trscation id is:" + tx;
    if (result === "fail") {
      desc = "Check your wallet.";
    }
    notification.open({
      message: "Buy Tickets Result:" + result,
      description: desc,
    });
  };

  const buyInstant = () => {
    let tickets: string[] = [];
    for (let i = 0; i < numbers.length; i++) {
      tickets.push(numbers[i].data.toString());
    }
    handleCancel(null);
    console.log("tickets:", tickets);

    const account = localStorage.getItem("account");
    // get cost.
    calculateTotalPriceForBulkTickets(
      LotteryContract,
      numbers.length,
      account!
    ).then((res) => {
      console.log("cost is:", res);
      // approve busd.
      ApproveBUSD(BUSD, account!, LotteryContract, res).then((res) => {
        console.log("approve:", res);
        // buy tickets.
        buyTickets(LotteryContract, tickets).then((res) => {
          openNotification("Success", res);
          console.log("buy tickets:", tickets, res);
        });
      });
    });
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
          onChange={changeTickets}
          onSearch={onSearch}
        />
      </div>
      <div className="buyTicketsModal-title">
        <div></div>
        <div>BUSD Balance: {balance}</div>
      </div>
      <div className="buyTicketsModal-title">
        <div>Cost (BUSD)</div>
        <div>{tickets.toString()} BUSD</div>
      </div>
      <div className="buyTicketsModal-title">
        <div>
          {discount.toString()}% Bulk discount
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
                  <div>5 tickets: 10%</div>
                  <div>20 tickets: 20%</div>
                  <div>100 tickets: 30%</div>
                </Space>
              </div>
            }
            arrowPointAtCenter
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <div>{cost.toString()} BUSD</div>
      </div>
      <Divider />
      <div className="buyTicketsModal-title">
        <div>You Pay</div>
        <div>{cost.toString()} BUSD</div>
      </div>
      <div className="buyTicketsModal-buyInstant">
        <Button type="primary" shape="round" onClick={buyInstant}>
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
