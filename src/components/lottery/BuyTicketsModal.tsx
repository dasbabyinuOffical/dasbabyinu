import React, { useEffect, useState, useMemo } from "react";

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

const daiAddress = "0x5eC5a89BDdF7AF48392B2f8a5419080470Ee238b";
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

  const [tickets, setTickets] = useState(0);

  const [discount, setDiscount] = useState(0);

  const [cost, setCost] = useState(0);

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
    setTickets(max);
  };

  const generateTicketsNumber = (cnt: Number) => {
    setTickets(Number(cnt));

    let generateNumbers: any[] = [];
    // generate radom numbers
    for (let i = 0; i < cnt; i++) {
      let a1 = Math.round(Math.random() * 10);
      let a2 = Math.round(Math.random() * 10);
      let a3 = Math.round(Math.random() * 10);
      let a = a1 * 100 + a2 * 10 + a3;
      generateNumbers.push({
        key: i,
        number: <Input defaultValue={a} maxLength={6} />,
        data: 1000 + a,
      });
    }
    setNumbers(generateNumbers);

    // set discount
    if (cnt >= 2) {
      setDiscount(0.05);
      setCost((Number(cnt) * 99.95) / 100);
    }
    if (cnt >= 50) {
      setDiscount(2.45);
      setCost((Number(cnt) * 97.55) / 100);
    }
    if (cnt >= 100) {
      setDiscount(4.95);
      setCost((Number(cnt) * 95.05) / 100);
    }
  };

  useMemo(() => {
    generateTicketsNumber(tickets);
  }, [tickets]);

  const changeTickets = (e: any) => {
    e.preventDefault();
    let cnt = Number(e.target.value);
    generateTicketsNumber(cnt);
  };

  const openNotification = (result: string, tx: string) => {
    let desc = "trscation id is:" + tx;
    if (result == "fail") {
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
      tickets.push(numbers[i].data);
    }
    handleCancel(null);
    console.log("tickets:", tickets);

    const account = localStorage.getItem("account");
    // get cost.
    calculateTotalPriceForBulkTickets(
      daiAddress,
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

    // buy tickets.
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
          value={tickets}
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
