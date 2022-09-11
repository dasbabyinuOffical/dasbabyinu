import { ethers } from "ethers";
import LotteryAbi from "../config/abi/Lottery.json";
import BUSDAbi from "../config/abi/BUSD.json";

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

export async function randomResult(daiAddress: string): Promise<string[]> {
  if (!window.ethereum) {
    return [];
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.finalNumber();

  const final = result.toString();
  let results: string[] = [];
  for (let i = 1; i < final.length; i++) {
    results.push(final[i]);
  }
  return results;
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

export async function userReward(
  daiAddress: string,
  address: string
): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.userRewards(address);
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
  const ret = ethers.utils.formatUnits(result, 0);
  return ret;
}

export async function startTime(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.startTime();
  const ret = ethers.utils.formatUnits(result, 0);
  return ret;
}

export async function endTime(daiAddress: string): Promise<number> {
  if (!window.ethereum) {
    return 0;
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.endTime();
  return result;
}

export async function buyTickets(
  daiAddress: string,
  numbers: string[]
): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);
  let data: BigInt[] = [];
  for (let i = 0; i < numbers.length; i++) {
    data.push(BigInt(numbers[i]));
  }
  const gas = await daiContractWithSigner.estimateGas.buyTickets(0, data);
  const tx = await daiContractWithSigner.buyTickets(0, data, {
    gasLimit: gas,
  });

  await tx.wait();
  return tx.hash;
}

export async function calculateTotalPriceForBulkTickets(
  daiAddress: string,
  numberTickets: Number,
  address: string
): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.calculateTotalPriceForBulkTickets(
    numberTickets,
    address
  );
  const ret = ethers.utils.formatUnits(result, 0);
  return ret;
}

export async function userTicketsCnt(
  daiAddress: string,
  address: string
): Promise<Number> {
  if (!window.ethereum) {
    return 0;
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  const result = await daiContract.userTicketsCnt(address);
  return result;
}

export async function userTicketsNumber(
  daiAddress: string,
  address: string,
  num: number
): Promise<string[]> {
  if (!window.ethereum) {
    return [];
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);
  let results: string[] = [];
  for (let i = 0; i < num; i++) {
    const result = await daiContract.userTickets(address, i);
    let ret = result.toString();
    results.push(ret.slice(1, ret.length));
  }
  return results;
}

export async function ApproveBUSD(
  daiAddress: string,
  owner: string,
  spender: string,
  cnt: string
): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, BUSDAbi, providerWeb3);
  const allow = await daiContract.allowance(owner, spender);

  // only when allow less than cnt, need to approve again
  if (allow < BigInt(cnt)) {
    const signer = providerWeb3.getSigner();
    const daiContractWithSigner = daiContract.connect(signer);
    await daiContractWithSigner.approve(spender, BigInt(cnt));
  }
  return "1";
}

export async function claimTickets(daiAddress: string): Promise<string> {
  if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(daiAddress, LotteryAbi, providerWeb3);

  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  console.log("daiContractWithSigner: ", daiContractWithSigner);
  const gas = await daiContractWithSigner.estimateGas.claimTickets(0, [], []);
  const tx = await daiContractWithSigner.claimTickets(0, [], [], {
    gasLimit: gas,
  });

  await tx.wait();
  return tx.hash;
}
