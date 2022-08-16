import { Layout, Menu, Affix, Avatar } from "antd";
import { Link } from "react-router-dom";
import MetaMask from "./MetaMask";
import React from "react";

let  Logo =  require("./images/logo.png");
let  Nft =  require("./images/nft.jpg");
let  Trade = require("./images/trade.png");
let  Market = require("./images/market.png");
let Lottery = require("./images/lottery.png");
let Farm = require("./images/farm.png");
let Staking = require("./images/staking.png");
let Loan = require("./images/loan.png");
let Game = require("./images/game.png");
let City = require("./images/city.png");

const title = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
    icon: <Avatar src={Logo} />,
  },
  {
    key: "2",
    label: <Link to="/nft">Nft</Link>,
    icon: <Avatar src={Nft} />,
  },
  {
    key: "3",
    label: <Link to="/market">Market</Link>,
    icon: <Avatar src={Market} />,
  },
  {
    key: "4",
    label: <Link to="/trade">Trade</Link>,
    icon: <Avatar src={Trade} />,
  },
  {
    key: "5",
    label: <Link to="/lottery">Lottery</Link>,
    icon: <Avatar src={Lottery} />,
  },
  {
    key: "6",
    label: <Link to="/farm">Farm</Link>,
    icon: <Avatar src={Farm} />,
  },
  {
    key: "7",
    label: <Link to="/staking">Staking</Link>,
    icon: <Avatar src={Staking} />,
  },
    {
    key: "8",
    label: <Link to="/loan">Loan</Link>,
    icon: <Avatar src={Loan} />,
  },
  {
    key: "9",
    label: <Link to="/game">Game</Link>,
    icon: <Avatar src={Game} />,
  },
  {
    key: "10",
    label: <Link to="/city">City</Link>,
    icon: <Avatar src={City} />,
  },
];

const  Header:React.FC = () =>
  (
    <Layout.Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={title}
      />
      <Affix style={{ position: "absolute", top: 0, right: 0 }}>
        <MetaMask />
      </Affix>
    </Layout.Header>
  );

export default Header;
