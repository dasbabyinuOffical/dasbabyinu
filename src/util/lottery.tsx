import { ethers } from "ethers";
import RandomGeneratorAbi from "../config/abi/RandomGenerator.json";

declare var window: any;

export async function latestLotteryId(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(
    daiAddress,
    RandomGeneratorAbi,
    providerWeb3
  );
  const id = await daiContract.latestLotteryId();
  const ret = ethers.utils.formatUnits(id, 0);
  return ret;
}

export async function randomResult(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0000000";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(
    daiAddress,
    RandomGeneratorAbi,
    providerWeb3
  );
  const result = await daiContract.randomResult();
  const ret = ethers.utils.formatUnits(result, 0);
  return ret;
}
