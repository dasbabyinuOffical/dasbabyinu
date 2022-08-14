import { Layout, Menu, Affix, Avatar } from "antd";
import { Link } from "react-router-dom";
import MetaMask from "./MetaMask";
import Logo from "./images/logo.png";

const title = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
    icon: <Avatar src={Logo} />,
  },
  {
    key: "2",
    label: <Link to="nft">Nft</Link>,
  },
];

function Header() {
  return (
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
}

export default Header;
