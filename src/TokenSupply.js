import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

function TokenSupply() {
  const getOption = () => {
    let option = {
      title: {
        text: "DasBaby",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        //提示框浮层内容格式器，支持字符串模板和回调函数形式。
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        top: 20,
        right: 5,
        data: ["Community", "Charity", "Market and Cex", "Liquidity Pool"],
      },
      series: [
        {
          name: "TokenSupply 10B",
          type: "pie",
          data: [
            { value: 40, name: "Community" },
            { value: 10, name: "Charity" },
            { value: 20, name: "Market and Cex" },
            { value: 30, name: "Liquidity Pool" },
          ],
        },
      ],
    };
    return option;
  };
  return <ReactEcharts option={getOption()} />;
}

export default TokenSupply;
