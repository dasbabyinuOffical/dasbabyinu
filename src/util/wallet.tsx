import { ethers } from "ethers";
import RouterAbi from "../config/abi/IPancakeRouter02.json";

declare var window: any;

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const RouterContract = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

export async function getBalanceOf(
  daiAddress: string,
  address: string
): Promise<string> {
  if (!window.ethereum) {
    return "0.0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  if (daiAddress === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
    const balance = await providerWeb3.getBalance(address);
    const ret = ethers.utils.formatUnits(balance, 18);
    return Promise.resolve(ret);
  }

  const daiContract = new ethers.Contract(daiAddress, abi, providerWeb3);
  const balance = await daiContract.balanceOf(address);
  // ge decimal
  const decimal = await daiContract.decimals();
  const ret = ethers.utils.formatUnits(balance, decimal);
  console.log("ret is:", ret);
  return ret;
}

export async function getAllowance(
  daiAddress: string,
  owner: string,
  spender: string
): Promise<string> {
  if (!window.ethereum) {
    return "0.0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, abi, providerWeb3);
  const allow = await daiContract.allowance(owner, spender);
  // get allow
  const ret = ethers.utils.formatUnits(allow, 0);
  return ret;
}

export async function getDecimalOf(daiAddress: string): Promise<number> {
  if (!window.ethereum) {
    return 0;
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  console.log("contract is:", daiAddress);
  if (daiAddress === "BNB") {
    return 18;
  }

  if (daiAddress === "DasBaby") {
    daiAddress = "0x8e849671C0516Fd9A74075F2349A78390D52aa28";
  }

  const daiContract = new ethers.Contract(daiAddress, abi, providerWeb3);
  // ge decimal
  const decimal = await daiContract.decimals();
  return decimal;
}

export async function getAmountsOut(
  contractSell: string,
  sellAmount: string,
  contractBuy: string,
  path: string[]
): Promise<string> {
  console.log(
    "in getAmountsOut:",
    contractSell,
    sellAmount,
    contractBuy,
    window.ethereum
  );
  if (!window.ethereum || sellAmount === "") {
    console.log("exception return.");
    return "0.0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(
    RouterContract,
    RouterAbi,
    providerWeb3
  );

  const decimalSell = await getDecimalOf(contractSell);
  const decimalBuy = await getDecimalOf(contractBuy);
  const sellAmountNum = ethers.utils.parseUnits(sellAmount, decimalSell);
  console.log("sellAmountNum is:", sellAmount, sellAmountNum);
  if (sellAmountNum.eq(BigInt(0))) {
    return Promise.resolve("0.0");
  }

  const amountOut = await daiContract.getAmountsOut(sellAmountNum, path);
  const ret = ethers.utils.formatUnits(
    amountOut[amountOut.length - 1].toString(),
    decimalBuy
  );
  return Promise.resolve(ret);
}

export async function swap(
  amountInMin: string,
  amountOutMin: string,
  path: string[],
  to: string,
  deadline: number
): Promise<string> {
  if (!window.ethereum || amountOutMin === "") {
    console.log("exception return.");
    return "";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(
    RouterContract,
    RouterAbi,
    providerWeb3
  );

  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  console.log("path is:", path);
  try {
    // buy use bnb
    if (path[0] === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
      const decimalOut = await getDecimalOf(path[path.length - 1]);
      const amountOut = ethers.utils.parseUnits(amountOutMin, decimalOut);
      console.log("swap:", amountOut.toString(), path, to, deadline);
      if (amountOut.eq(BigInt(0))) {
        return Promise.resolve("");
      }
      const gas = await daiContractWithSigner.estimateGas.swapExactETHForTokens(
        amountOut,
        path,
        to,
        deadline,
        {
          value: ethers.utils.parseEther(amountInMin),
        }
      );

      const tx = await daiContractWithSigner.swapExactETHForTokens(
        amountOut,
        path,
        to,
        deadline,
        {
          value: ethers.utils.parseEther(amountInMin),
          gasLimit: gas,
        }
      );

      console.log("tx is:", tx);
      tx.wait();
      return Promise.resolve(tx.hash);
    }

    // sell to bnb
    if (
      path[path.length - 1] === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    ) {
      const decimalIn = await getDecimalOf(path[0]);
      const amountIn = ethers.utils.parseUnits(amountInMin, decimalIn);
      console.log(
        "swap:",
        amountIn.toString(),
        ethers.utils.parseEther(amountOutMin).toString(),
        path,
        to,
        deadline
      );
      const gas =
        await daiContractWithSigner.estimateGas.swapExactTokensForETHSupportingFeeOnTransferTokens(
          amountIn,
          ethers.utils.parseEther(amountOutMin),
          path,
          to,
          deadline
        );

      const tx =
        await daiContractWithSigner.swapExactTokensForETHSupportingFeeOnTransferTokens(
          amountIn,
          ethers.utils.parseEther(amountOutMin),
          path,
          to,
          deadline,
          {
            gasLimit: gas,
          }
        );

      console.log("tx is:", tx);
      tx.wait();
      return Promise.resolve(tx.hash);
    }
  } catch (e) {
    let reason = "Unknown Error";
    if (e instanceof Error) reason = e.message;
    return Promise.resolve(reason);
  }

  // buy and sell not bnb

  try {
    const decimalIn = await getDecimalOf(path[0]);
    console.log("decimalIn is:", amountInMin, decimalIn);
    const amountIn = ethers.utils.parseUnits(amountInMin, decimalIn);
    const decimalOut = await getDecimalOf(path[path.length - 1]);
    console.log("decimalOut is:", amountOutMin, decimalOut);
    const amountOut = ethers.utils.parseUnits(amountOutMin, decimalOut);
    console.log(
      "swap:",
      amountIn.toString(),
      amountOut.toString(),
      path,
      to,
      deadline
    );
    const gas =
      await daiContractWithSigner.estimateGas.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        amountIn,
        amountOut,
        path,
        to,
        deadline
      );

    console.log("gas is:", gas);
    const tx =
      await daiContractWithSigner.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        amountIn,
        amountOut,
        path,
        to,
        deadline,
        {
          gasLimit: gas,
        }
      );

    console.log("tx is:", tx);
    tx.wait();
    return Promise.resolve(tx.hash);
  } catch (e) {
    let reason = "Unknown Error";
    if (e instanceof Error) reason = e.message;
    return Promise.resolve(reason);
  }
}
