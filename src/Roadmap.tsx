import { Card, List, Avatar } from "antd";
import React from "react";
const roadmap = [
  {
    title: "Step 1",
    step: [
      "Offical website lunch",
      "Twitter and Telegram Community",
      "500+ holders",
      "Genesis Nft Lunch",
      "Nft Marketpalce Lunch",
    ],
  },
  {
    title: "Step 2",
    step: [
      "Telegram marketing activities",
      "Lottery Game Lunch",
      "10000+ holders",
      "First Cex Lunch",
    ],
  },
  {
    title: "Step 3",
    step: [
      "Defi and Fariming Pool Lunch",
      "Borrow Platform Lunch",
      "More Community activities",
      "Major Cex Lunch",
      "100000+ holders",
    ],
  },
  {
    title: "Step 4",
    step: [
      "More Community activities",
      "SocialFi App Lunch",
      "Meteverse Game Lunch",
      "More Cex Lunch Lunch",
      "100000+ holders",
    ],
  },
];

const  Roadmap: React.FC = () =>
  (
    <Card title="Roadmap" bordered={true}>
      <List
        itemLayout="vertical"
        dataSource={roadmap}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.step.map((content, index) => (
                <div key={index}>{content}</div>
              ))}
            />
          </List.Item>
        )}
      />
    </Card>
  );

export default Roadmap;
