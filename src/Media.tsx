import React from "react";

let  Twitter =  require( "./images/twitter.svg");
let  Telegram = require("./images/telegram.svg");
let  Book  = require("./images/book.svg");
let  Pancake  = require( "./images/pancake.svg");

const  Media: React.FC = () =>
  (
    <div>
      <a
        className="media"
        href="http://twitter.com/DasBaby_Inu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Twitter" src={Twitter.default} width="40" height="40"></img>
      </a>
      <a
        className="media"
        href="https://t.me/DasBaby_Inu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Telegram" src={Telegram.default} width="40" height="40"></img>
      </a>
      <a
        className="media"
        href="whitePaper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="WhiteBook" src={Book.default} width="40" height="40"></img>
      </a>
      <a
        className="media"
        href="https://pancakeswap.finance/swap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="PancakeSwap" src={Pancake.default} width="100" height="40"></img>
      </a>
    </div>
  );

export default Media;
