import Twitter from "./images/twitter.svg";
import Telegram from "./images/telegram.svg";
import Book from "./images/book.svg";
import Pancake from "./images/pancake.svg";

function Media() {
  return (
    <div>
      <a
        className="media"
        href="http://twitter.com/DasBaby_Inu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Twitter" src={Twitter} width="40" height="40"></img>
      </a>
      <a
        className="media"
        href="https://t.me/DasBaby_Inu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Telegram" src={Telegram} width="40" height="40"></img>
      </a>
      <a
        className="media"
        href="/whitePaper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="WhiteBook" src={Book} width="40" height="40"></img>
      </a>
      <a
        className="media"
        href="https://pancakeswap.finance/swap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="PancakeSwap" src={Pancake} width="100" height="40"></img>
      </a>
    </div>
  );
}

export default Media;
