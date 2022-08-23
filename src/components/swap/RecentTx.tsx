import { Modal, List } from "antd";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import { setRecentTxInVisiable } from "../../store/swap/TokenSelect";

const UrlPrefix =
  "https://api.bscscan.com/api?apikey=X4G8XDAWSXKVGBSYVKFGX8FSEHS6Y57ZSZ&module=account&action=txlist&page=1&offset=10&sort=desc&address=";

function RecentTx() {
  const visibility = useAppSelector((state) => state.tokenSelect.recentTx);
  const dispatch = useAppDispatch();

  const [txList, setTxList] = useState([]);

  useEffect(() => {
    const account = localStorage.getItem("account");
    fetch("http://dasbabyinu.com/trade/tx_list/" + account)
      .then((response) => response.json())
      .then((res) => {
        setTxList(res);
      });
  }, []);

  return (
    <Modal
      title="Recent Transactions"
      visible={visibility}
      footer={null}
      destroyOnClose={true}
      closable={true}
      onCancel={() => {
        dispatch(setRecentTxInVisiable());
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={txList}
        renderItem={(item: string, index: number) => {
          return (
            <List.Item>
              <a href={"https://bscscan.com/tx/" + item} target="_blank">
                {index + 1}. {item.slice(0, 32)}
              </a>
            </List.Item>
          );
        }}
      />
    </Modal>
  );
}

export default RecentTx;
