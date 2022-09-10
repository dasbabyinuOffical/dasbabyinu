import { ethers } from "ethers";
import LotteryAbi from "../config/abi/Lottery.json";

declare var window: any;

export async function latestLotteryId(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const id = await daiContract.currentLotteryId();
  const ret = ethers.utils.formatUnits(id, 0);
  return ret;
}

export async function randomResult(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0000000";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.finalNumber();
  const ret = ethers.utils.formatUnits(result, 0);
  return ret;
}

export async function totalReward(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.totalReward();
  const ret = ethers.utils.formatUnits(result, 18);
  return ret;
}

export async function status(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.status();
  const ret = ethers.utils.formatUnits(result, 18);
  return ret;
}
