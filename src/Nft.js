import { Card, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Mint from "./Mint";
const borderBrone = "0.5rem solid #C47222";
const borderSilver = "0.5rem solid #c0c0c0";

function Nft() {
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState({
    min: 0,
    max: 10,
  });

  const onChange = (page, pageSize) => {
    setCursor({
      min: (page - 1) * pageSize,
      max: page * pageSize,
    });
  };

  useEffect(() => {
    const url = "http://dasbabyinu.com/nft/?start=1&&page=1000";
    axios.get(url).then((res) => {
      setData([...data, ...res.data]);
    });
  }, [data]);

  return (
    <>
      {data.slice(cursor.min, cursor.max).map((item) => {
        return (
          <Card
            hoverable
            key={item.id}
            bordered={true}
            cover={<label style={{ marginLeft: "7rem" }}>{item.name}</label>}
            style={{
              width: "18.5rem",
              height: "23rem",
              display: "inline-block",
              marginLeft: "1rem",
              marginBottom: "1rem",
              verticalAlign: "top",
              borderRadius: "0.5rem",
              fontSize: "small",
              border: item.id < 212 ? borderSilver : borderBrone,
            }}
            actions={[<Mint id={item.id} />]}
          >
            <img alt={item.name} src={item.image} width="100%" height="100%" />
          </Card>
        );
      })}
      <Pagination
        defaultCurrent={1}
        defaultPageSize={10}
        onChange={onChange}
        total={1000}
      />
    </>
  );
}

export default Nft;
