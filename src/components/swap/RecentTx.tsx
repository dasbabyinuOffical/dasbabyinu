import { Modal } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/Hook";
import { setRecentTxInVisiable } from "../../store/swap/TokenSelect";

function RecentTx() {
  const visibility = useAppSelector((state) => state.tokenSelect.recentTx);
  const dispatch = useAppDispatch();

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
    />
  );
}

export default RecentTx;
