import { Modal, List } from "antd";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import {
  setRecentTxInVisiable,
  setSelectedTxList,
} from "../../store/swap/TokenSelect";

function RecentTx() {
  const visibility = useAppSelector((state) => state.tokenSelect.recentTx);
  const txList = useAppSelector((state) => state.tokenSelect.txList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const account = localStorage.getItem("account");
    fetch("http://dasbabyinu.com/trade/tx_list/" + account)
      .then((response) => response.json())
      .then((res) => {
        dispatch(setSelectedTxList(res));
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
              <a
                href={"https://bscscan.com/tx/" + item}
                target="_blank"
                rel="noreferrer"
              >
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
